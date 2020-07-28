#include <iostream>

int getUserInput()
{
    int num{0};
    std::cout << "Enter a number: ";
    std::cin >> num;
    return num;
}

int main()
{
    int num{ getUserInput() };
    std::cout << "Square of " << num << " is: " << num*num;
    return 0;
}