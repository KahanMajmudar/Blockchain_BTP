#include "constants.h"
#include "main.h"
#include <cmath>
#include <iostream>

int main()
{
    double height{ getUserInput() };
    calcResult(height);
}

double getUserInput()
{
    double num{ 0 };
    std::cout << "Enter the height of the tower in meters: ";
    std::cin >> num;
    return num;
}


void calcResult(double height)
{
    // formula = 1/2 * height * time^2

    for (size_t i = 0; ; i++)
    {
        // std::cout << "const is: " << constants::gravity << '\n';

        double result = height - ( 0.5 * constants::gravity * std::pow(i, 2) );
        if (result > 0)
        {
            std::cout << "At " << i << " seconds, the ball is at height: " << result << " m" << '\n';
        }
        else
        {
            std::cout << "At " << i << " seconds, the ball is on the ground." << '\n';
            break;
        }

    }

}