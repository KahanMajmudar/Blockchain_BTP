package main

import (
	"fmt"
	"math"
)

// Shape interface
type Shape interface {
	area() float64
	perimeter() float64
}

// Circle struct
type Circle struct {
	x, y, radius float64
}

// Triangle struct
type Triangle struct {
	a, b, c float64
}

func (c Circle) area() float64 {

	return math.Pi * c.radius * c.radius

}

func (c Circle) perimeter() float64 {

	return 2 * math.Pi * c.radius

}

func (t Triangle) area() float64 {

	s := (t.a + t.b + t.c) / 2
	A := math.Sqrt(s * (s - t.a) * (s - t.b) * (s - t.c))

	return A

}

func (t Triangle) perimeter() float64 {

	return t.a + t.b + t.c
}

func getArea(s Shape) float64 {

	return s.area()
}

func getPerimeter(s Shape) float64 {

	return s.perimeter()
}

func main() {

	circle := Circle{x: 0, y: 0, radius: 7}

	triangle := Triangle{a: 12, b: 5, c: 8}

	fmt.Println("Area of the Circle is: ", getArea(circle))
	fmt.Println("Area of the Triangle is: ", getArea(triangle))

	fmt.Println("Perimeter of the Circle is: ", getPerimeter(circle))
	fmt.Println("Perimeter of the Triangle is: ", getPerimeter(triangle))

}
