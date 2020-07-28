#include <iostream>

int getUserValue()
{
    int num{0};
    std::cout << "Enter a number: ";
    std::cin >> num;
    return num;
}

void printSquare(int num)
{
    std::cout << "The square of " << num << " is: " << num*num << std::endl;
}