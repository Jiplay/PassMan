package main

import (
	"PassMan/mongodb"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved,
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) Login(name string, password string) string {
	if len(name) <= 3 || len(password) < 12 {
		return "false"
	}

	client, err := mongodb.InitMongo()
	if err != nil {
		fmt.Println(err.Error())
		return "false"
	}
	userData, err := mongodb.GetUser(client, name)
	if err != nil {
		fmt.Println(err.Error())
		return "false"
	}
	if CheckPasswordHash(password, userData.Password) == true {
		return "true"
	}
	return "false"
}

func (a *App) Register(name string, password string) string {
	resp, errHash := HashPasswordBcrypt(password)
	if errHash != nil || len(name) <= 3 {
		return "false"
	}
	client, err := mongodb.InitMongo()
	if err != nil {
		return "false"
	}

	user := mongodb.User{Login: name, Password: resp}
	err = mongodb.AddUniqueUser(client, "PassMan", "User", user)
	if err != nil {
		return "false"
	}
	return "true"
}

func (a *App) GenerateSafePassword(length int) string {
	password, err := GeneratePassword(length)
	if err != nil {
		return "failure"
	}
	return password
}

func (a *App) SaveCredentials(userData mongodb.User, credentials mongodb.Credentials) string {
	if userData.Login == "" || credentials.Password == "" || credentials.Website == "" {
		return "false"
	}
	client, err := mongodb.InitMongo()
	if err != nil {
		return "false"
	}

	vaults, err := mongodb.GetPasswords(client, userData.Login)
	if err != nil {
		return "false"
	}

	for _, credential := range vaults.Credentials {
		if credential.Website == credentials.Website {
			return "false"
		}
	}

	pswEncoded, _ := Encrypt(userData.Password, credentials.Password)

	creds := mongodb.Credentials{
		Website:    credentials.Website,
		Login:      credentials.Login,
		Password:   pswEncoded,
		Additional: credentials.Additional,
	}
	_, err = mongodb.AddPassword(client, userData.Login, creds)
	if err != nil {
		return "false"
	}
	return "true"
}

func (a *App) GetPasswordForUser(username string) []mongodb.Credentials {
	if len(username) <= 3 {
		return nil
	}
	client, err := mongodb.InitMongo()
	if err != nil {
		return nil
	}

	resp, err := mongodb.GetPasswords(client, username)
	if err != nil {
		return nil
	}

	return resp.Credentials
}

func (a *App) DecryptPsw(mainPassword string, password string) string {
	if password == "" || len(mainPassword) <= 10 {
		return ""
	}

	psw, err := Decrypt(mainPassword, password)

	if err != nil {
		return ""
	}

	return psw
}

func (a *App) DeletePassword(username string, website string) bool {
	if len(username) <= 3 || len(website) <= 3 {
		return false
	}
	client, err := mongodb.InitMongo()
	resp, err := mongodb.RemovePassword(client, username, website)
	if err != nil || resp == false {
		return false
	}
	return true
}
