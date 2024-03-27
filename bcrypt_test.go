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

var tests = []Test{
	{"azerty", false},
	{"Azerty", false},
	{"azertyoiu1234", false},
	{"Azertyiop*", false},
	{"ThisIsARobustpsw123*", true},
	{"ThisIsARobustpsw123$", true},
	{"ThisIsARobustpsw123é", true},
	{"ThisIsARobustpsw123à", true},
}

var testsHashPassword = []TestHashPassword{
	{"azerty", "", fmt.Errorf("password too weak")},
	{"ThisIsARobustpsw123à", "", nil},
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
