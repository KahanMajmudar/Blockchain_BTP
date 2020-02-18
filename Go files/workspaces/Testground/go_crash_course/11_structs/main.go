package main

import "fmt"

// Car struct
type Car struct {
	name     string
	model    string
	price    string
	quantity int
	soldOut  bool
}

/*
type Car struct {
	name, model, price string
	quantity           int
	soldOut            bool
}
*/

// Details method (value receiver)
func (c Car) details() string {

	return "The car is " + c.name + " " + c.model + " " + "and the price is " + c.price
}

// isSold method (pointer receiver)
func (c *Car) isSold() {

	c.quantity--

}

func main() {

	car1 := Car{name: "Chevrolet", model: "Camero", price: "$34,000", quantity: 10, soldOut: false}

	// or
	// car1 := Car{"Chevrolet", "Camero", "$34,000", 10, false}

	fmt.Println(car1)
	fmt.Println(car1.quantity)
	fmt.Println(car1.details())
	car1.isSold()
	fmt.Println(car1)

}
