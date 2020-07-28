#include <iostream>

int info()
{
    int x;
    int y;
    y = 10;

    int a = 4;      // copy intitalization
    int b( 2 );     // direct initalization

    int c{ 1 };     // direct brace initialization
    int d = { 0 };  // copy brace initialization    --> preferred

    // return 0;

    // cout for printing to console
    std::cout << "Print Anything Here" << std::endl;
    std::cout << "The value is: " << y << std::endl;

    // or

    std::cout << "Print Anything Here" << '\n';
    std::cout << "The value is: " << y << '\n';
    std::cout << "Yet another way \n";

    // cin to read input
    std::cout << "Enter your age: ";
    int age{ };
    std::cin >> age;
    std::cout << "Your age is: " << age;

    return 0;
}


int main()
{
    std::cout << "Enter a number: ";
    int x{};
    std::cin >> x;
    std::cout << "You entered: " << x << '\n';
    return 0;
}