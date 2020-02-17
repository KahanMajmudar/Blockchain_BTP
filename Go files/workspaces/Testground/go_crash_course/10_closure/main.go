package main

import "fmt"

func main() {

	generator := fibonacciGen()

	for i := 0; i <= 10; i++ {

		fmt.Println(generator())
	}

}

func fibonacciGen() func() int {

	num1 := 0
	num2 := 1

	return func() int {

		num2, num1 = (num1 + num2), num2
		return num1
	}
}
