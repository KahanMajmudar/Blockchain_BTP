// Order your #includes as follows: your own user-defined headers first,
//                                  then 3rd party library headers,
//                                  then standard library headers, with the headers in each section sorted alphabetically.

#include "math.h"
#include <iostream>

int main()
{
    std::cout << "Enter number 1: ";
    int num1{0};
    std::cin >> num1;
    int num2{0};
    std::cout << "Enter number 2: ";
    std::cin >> num2;

    std::cout << "Addition is: "        << add(num1, num2) << '\n';
    std::cout << "Substraction is: "    << sub(num1, num2) << '\n';
    std::cout << "Multiplication is: "  << mul(num1, num2) << '\n';

    return 0;
}