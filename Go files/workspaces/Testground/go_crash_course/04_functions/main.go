package main

import (
	"fmt"
	"math"
)

func greet(name string) string {

	return "Hello " + name

}

func getMax(num1, num2 float64) float64 {

	return math.Max(num1, num2)

}

func main() {

	fmt.Println(greet("Anyone"))
	fmt.Println(getMax(1, 2))

}
