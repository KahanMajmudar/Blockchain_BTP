package main

import "fmt"

func main() {

	kv := make(map[int]string)

	kv[1] = "Value 1"
	kv[3] = "Value 3"
	kv[5] = "Value 5"
	kv[7] = "Value 7"

	// or
	// kv := map[int]string{1: "Value 1", 2: "Value 2"}

	fmt.Println(kv)
	fmt.Println(len(kv))
	fmt.Println(kv[5])

}
