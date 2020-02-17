package main

import "fmt"

func main() {
	a := 10
	b := &a // pointer to a (points to memory address of a)

	fmt.Println(a, b)

	fmt.Printf("%T\n", b)

	*b = 40 //accessing value stored at a

	fmt.Println("Value of a after update: ", a)
}
