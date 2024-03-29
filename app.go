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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Login(name string, password string) string {
	if len(name) <= 6 || len(password) < 12 {
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
	if errHash != nil {
		return "false"
	}
	client, err := mongodb.InitMongo()
	if err != nil {
		return "false"
	}

	user := mongodb.User{Login: name, Password: resp}
	err = mongodb.AddUser(client, "PassMan", "User", user)
	if err != nil {
		return "false"
	}
	return "true"
}
