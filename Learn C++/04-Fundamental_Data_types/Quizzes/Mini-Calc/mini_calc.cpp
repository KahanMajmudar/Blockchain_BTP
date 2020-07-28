#include "mini_calc.h"
#include <iostream>
#include <limits>

int main()
{
    // std::cout.precision(9);
    double num1{ getUserInput() };
    double num2{ getUserInput() };

    char choice{ getChoice() };

    double result{ calculate(num1, num2, choice) };

    std::cout << num1 << ' ' << choice << ' ' << num2 << " is " << result;

}

double getUserInput()
{
    double num{ 0 };
    std::cout << "Enter a double value: ";
    std::cin >> num;
    return num;
}

char getChoice()
{
    char choice{};
    std::cout << "Enter one of the following: +, -, *, or / : ";
    std::cin >> choice;
    return choice;
}

double calculate(double x, double y, char choice)
{
    if (choice == '+')
    {
        return x + y;
    }

    if (choice == '-')
    {
        return x - y;
    }

    if (choice == '*')
    {
        return x * y;
    }

    if (choice == '/')
    {
        return x / y;
    }

    else
    {
        return std::numeric_limits<double>::quiet_NaN();
    }


}
