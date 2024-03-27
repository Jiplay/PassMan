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

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) Login(name string, password string) {
	fmt.Println("Not implemented yet")
}

func (a *App) Register(name string, password string) {
	client, err := mongodb.InitMongo()
	if err != nil {
		panic("Unable to login to Mongo" + err.Error())
	}
	user := mongodb.User{Login: name, Password: password}
	err = mongodb.AddUser(client, "PassMan", "User", user)

	if err != nil {
		panic("Unable to register user")
	}
}
