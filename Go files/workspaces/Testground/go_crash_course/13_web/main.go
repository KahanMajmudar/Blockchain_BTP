package main

import (
	"fmt"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintf(w, "<h1>Hello from Go Server</h1>")

}

func about(w http.ResponseWriter, r *http.Request) {

	fmt.Fprintf(w, "Learning Go HTTP module")

}

func main() {

	http.HandleFunc("/", index)
	http.HandleFunc("/about", about)
	fmt.Println("Listening on port 3000...")
	http.ListenAndServe(":3000", nil)

}
