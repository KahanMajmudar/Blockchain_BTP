package main

import (
	"fmt"
	"math"

	//relative imports are allowed outside src folders
	"./stringutils"
)

func main() {

	fmt.Println("Reversing String...")
	fmt.Println(stringutils.ReverseStr("Test"))
	fmt.Println("Square Root of 5 is...")
	fmt.Println(math.Sqrt(5))
}
