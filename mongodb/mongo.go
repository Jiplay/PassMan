package mongodb

import (
	"context"
	"encoding/json"
	"fmt"
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

func getCredentialsFromFile(path string) (config, error) {
	var cfg config
	file, err := os.Open(path)
	if err != nil {
		fmt.Println("Can't open file:", err)
		return cfg, fmt.Errorf("Coundn't open file")
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
		return cfg, fmt.Errorf("Coudn't decode file")
	}
	return cfg, nil
}

func InitMongo() (*mongo.Client, error) {
	// Set up client options
	cfg, err := getCredentialsFromFile("config.json")
	if err != nil {
		return nil, fmt.Errorf("Coudn't decode file")
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

func AddUser(client *mongo.Client, dbName, collectionName string, user User) error {
	// Get a handle for your collection
	collection := client.Database(dbName).Collection(collectionName)

	// Insert User document into the collection
	_, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		return err
	}

	fmt.Println("User added successfully!")
	return nil
}
