package main

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"unicode"
)

type passwordExigence struct {
	DigitCheck   bool
	UpperCheck   bool
	LowerCheck   bool
	SpecialCheck bool
}

func HashPasswordBcrypt(password string) (string, error) {
	isPswStrong := isPswStrongEnough(password)
	if isPswStrong == false {
		return "", fmt.Errorf("password too weak")
	}
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func isPswStrongEnough(password string) bool {
	var checks passwordExigence

	if len(password) <= 12 {
		return false
	}
	for _, char := range password {
		if unicode.IsDigit(char) {
			checks.DigitCheck = true
		}
		if unicode.IsUpper(char) {
			checks.UpperCheck = true
		}
		if unicode.IsLower(char) {
			checks.LowerCheck = true
		}
		if char > '!' && char < '0' && char < 57 && char < 65 {
			checks.SpecialCheck = true
		}
	}

	if checks.SpecialCheck == false || checks.LowerCheck == false || checks.DigitCheck == false || checks.UpperCheck == false {
		return false
	}

	return true
}
