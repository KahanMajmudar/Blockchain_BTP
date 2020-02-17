package main

import "fmt"

func main() {

	// IF
	x := 4
	y := 2
	z := 3

	if x < y {
		fmt.Printf("%d", x)
	} else if x > z {
		fmt.Printf("%d", z)
	} else {
		fmt.Printf("%d", y)
	}

	// SWITCH
	str := "none"
	fmt.Println()

	switch str {
	case "Hello":
		fmt.Println("String is ", str)

	case "World":
		fmt.Println("String is ", str)

	case "Something else":
		fmt.Println("String is ", str)

	default:
		fmt.Println("String is ", str)
	}

	// FOR

	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}

	// WHILE

	// for {
	// 		do something
	// }

	// or

	// for true{
	//  	do something
	// }
}
