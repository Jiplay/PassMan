package mongodb

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
)

type config struct {
	User string `json:"user"`
	Key  string `json:"key"`
}

type User struct {
	Login    string `bson:"login"`
	Password string `bson:"password"`
}

type Credentials struct {
	Website    string
	Login      string
	Password   string
	Additional string
}

type Vault struct {
	Login       string        `bson:"login"`
	Credentials []Credentials `bson:"credentials"`
}

func getCredentialsFromFile(path string) (config, error) {
	var cfg config
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("Can't open file:", err)
		return cfg, fmt.Errorf("coundn't open file")
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			panic("Strange things happened while closure of the file" + err.Error())
		}
	}(file)

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&cfg)
	if err != nil {
		fmt.Println("Erreur en décodant le JSON:", err)
		return cfg, fmt.Errorf("coudn't decode file")
	}
	return cfg, nil
}

func InitMongo() (*mongo.Client, error) {
	// Set up client options
	cfg, err := getCredentialsFromFile("config.json")
	if err != nil {
		return nil, fmt.Errorf("coudn't decode file")
	}
	URI := fmt.Sprintf("mongodb+srv://%s:%s@passman0.dvs4rna.mongodb.net/?retryWrites=true&w=majority&appName=PassMan0", cfg.User, cfg.Key)
	clientOptions := options.Client().ApplyURI(URI)

	// Connect to MongoDB
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, err
	}

	// Ping the MongoDB server to check if the connection is established
	err = client.Ping(context.Background(), nil)
	if err != nil {
		return nil, err
	}

	fmt.Println("Connected to MongoDB!")
	return client, nil
}

func AddUniqueUser(client *mongo.Client, dbName, collectionName string, user User) error {
	collection := client.Database(dbName).Collection(collectionName)

	existingUser := User{}
	err := collection.FindOne(context.Background(), bson.M{"login": user.Login}).Decode(&existingUser)
	if err == nil {
		return fmt.Errorf("login already used")
	} else if !errors.Is(err, mongo.ErrNoDocuments) {
		return err
	}

	_, err = collection.InsertOne(context.Background(), user)

	if err != nil {
		return err
	}

	_, err = initVault(client, user.Login, user.Password)
	if err != nil {
		return err
	}

	fmt.Println("User added successfully!")
	return nil
}

func GetUser(client *mongo.Client, username string) (*User, error) {
	collection := client.Database("PassMan").Collection("User")
	ctx := context.Background()

	filter := bson.M{"login": username}

	var user User

	err := collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func initVault(client *mongo.Client, username string, hash string) (bool, error) {
	vaultCollection := client.Database("PassMan").Collection("Vaults")

	v := Vault{
		username,
		[]Credentials{},
	}

	_, err := vaultCollection.InsertOne(context.Background(), v)

	if err != nil {
		return false, err
	}

	return true, nil
}

func AddPassword(client *mongo.Client, username string, credentials Credentials) (bool, error) {
	vaultsCollection := client.Database("PassMan").Collection("Vaults")

	filter := bson.M{"login": username}
	update := bson.M{"$push": bson.M{"credentials": credentials}}

	_, err := vaultsCollection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		return false, err
	}

	return true, nil
}

func GetPasswords(client *mongo.Client, username string) (*Vault, error) {
	collection := client.Database("PassMan").Collection("Vaults")
	ctx := context.Background()

	filter := bson.M{"login": username}

	var vault Vault

	err := collection.FindOne(ctx, filter).Decode(&vault)
	if err != nil {
		return nil, err
	}

	return &vault, nil
}
