package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"io"
	"math/big"
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

func GeneratePassword(length int) (string, error) {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=[]{}|;:,.<>?/~"

	password := make([]byte, length)
	charsetLen := big.NewInt(int64(len(charset)))

	for i := 0; i < length; i++ {
		randomIndex, err := rand.Int(rand.Reader, charsetLen)
		if err != nil {
			return "", err
		}
		password[i] = charset[randomIndex.Int64()]
	}

	return string(password), nil
}

func Encrypt(key, text string) (string, error) {
	hashedKey := sha256.Sum256([]byte(key))
	block, err := aes.NewCipher(hashedKey[:])
	if err != nil {
		return "", err
	}

	ciphertext := make([]byte, aes.BlockSize+len(text))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	cfb := cipher.NewCFBEncrypter(block, iv)
	cfb.XORKeyStream(ciphertext[aes.BlockSize:], []byte(text))
	return base64.URLEncoding.EncodeToString(ciphertext), nil
}

func Decrypt(key, text string) (string, error) {
	hashedKey := sha256.Sum256([]byte(key))
	block, err := aes.NewCipher(hashedKey[:])
	if err != nil {
		return "", err
	}

	ciphertext, err := base64.URLEncoding.DecodeString(text)
	if err != nil {
		return "", err
	}

	if len(ciphertext) < aes.BlockSize {
		return "", fmt.Errorf("ciphertext too short")
	}

	iv := ciphertext[:aes.BlockSize]
	ciphertext = ciphertext[aes.BlockSize:]

	cfb := cipher.NewCFBDecrypter(block, iv)
	cfb.XORKeyStream(ciphertext, ciphertext)

	return string(ciphertext), nil
}
