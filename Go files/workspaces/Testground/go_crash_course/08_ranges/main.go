package main

import "fmt"

func main() {

	nums := []int{12, 5, 87, 44, 50, 1}

	for i, n := range nums {
		fmt.Printf("%d - Number: %d\n", i, n)
	}

	//without using i variable
	//use _ to tell complier to ignore unused variable

	for _, n := range nums {
		fmt.Printf("Number: %d\n", n)
	}

	kv := map[int]string{1: "Value 1", 2: "Value 2"}

	for k, v := range kv {
		fmt.Printf("Key: %d, value: %s\n", k, v)
	}

}
