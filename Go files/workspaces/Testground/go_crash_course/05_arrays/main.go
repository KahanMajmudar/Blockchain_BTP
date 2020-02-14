package main

import "fmt"

func main() {

	var carsArr [2]string

	carsArr[0] = "Car1"
	carsArr[1] = "Car2"

	//or
	/*

		carsArr := [2]string{"Car1" ,"Car2"}

	*/

	fmt.Println(carsArr)

	// for unknow size arrays
	carArrSlice := []string{"Car_S1", "Car_S2"}

	fmt.Println(carArrSlice)

}
