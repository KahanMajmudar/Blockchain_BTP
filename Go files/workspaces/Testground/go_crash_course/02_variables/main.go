package main

import "fmt"

func main() {

	// Main types
	// string
	// bool
	// int
	// int int8 int16 int32 int64
	// uint 	uint8 uint16 uint32 uint64 uintptr
	// byte -> alias for uint8
	// rune -> alias for int32
	// float32 float64
	// complex64 complex128

	//can use := only inside functions

	var name string = "Test" // or name:= "Test"
	var str = "String"

	// or name, str := "Test", "String"

	var num int = 10

	var flt = 12.4

	var smt bool = true // or var boolean = true

	fmt.Println(name, str, num, flt, smt)
	fmt.Printf("%T", flt)
}
