package main

import (
	"fmt"
	"testing"
)

type Test struct {
	in  string
	out bool
}

type TestHashPassword struct {
	in  string
	out string
	err error
}

type TestGeneratePsw struct {
	in  int
	out int
	err error
}

type TestEncryptPsw struct {
	key      string
	password string
	err      error
}

var tests = []Test{
	{"azerty", false},
	{"Azerty", false},
	{"azertyoiu1234", false},
	{"Azertyiop*", false},
	{"ThisIsARobustpsw123*", true},
	{"ThisIsARobustpsw123$", true},
	{"ThisIsARobustpsw123é", false},
	{"ThisIsARobustpsw123", false},
}

var testsHashPassword = []TestHashPassword{
	{"azerty", "", fmt.Errorf("password too weak")},
	{"ThisIsARobustpsw123à", "", nil},
}

var testsGeneratePassword = []TestGeneratePsw{
	{32, 32, nil},
	{64, 64, nil},
}

var testsEncryptPsw = []TestEncryptPsw{
	{"secretKey", "password123", nil},
}

func TestIsPswStrongEnough(t *testing.T) {
	for i, test := range tests {
		isPswStrong := isPswStrongEnough(test.in)
		if isPswStrong != test.out {
			t.Errorf("#%d: password:(%s); expected :%t", i, test.in, test.out)
		}
	}
}

func TestHashPasswordBcrypt(t *testing.T) {
	for i, test := range testsHashPassword {
		hashed, err := HashPasswordBcrypt(test.in)
		if CheckPasswordHash(test.in, hashed) != true && err == nil {
			t.Errorf("#%d: password:(%s); expected :%s", i, test.in, test.out)
		} else if err != nil {
			if err.Error() != err.Error() {
				t.Errorf("#%d: error:(%s); expected :%s", i, err, test.err)
			}
		}
	}
}

func TestGeneratePassword(t *testing.T) {
	for i, test := range testsGeneratePassword {
		password, _ := GeneratePassword(test.in)
		if len(password) != test.out {
			t.Errorf("#%d len of generate password : (%d); expected :%d", i, len(password), test.out)
		}
	}
}

func TestEncrypt(t *testing.T) {
	for i, test := range testsEncryptPsw {
		encryptedPsw, _ := Encrypt(test.key, test.password)
		decryptedPsw, _ := Decrypt(test.key, encryptedPsw)
		if test.password != decryptedPsw {
			t.Errorf("#%d encrypted and decrypted don't match : %s, %s", i, encryptedPsw, decryptedPsw)
		}
	}
}
