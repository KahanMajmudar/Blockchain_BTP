#include "main.h"
#include <iostream>

int main()
{
    int choice{ getUserInput() };

    processRequest(choice);

    return 0;

}

int getUserInput()
{
    int choice{ 0 };
    std::cout << "Welcome to the Cola Machine"  << '\n';
    std::cout << "1. Coke"                      << '\n';
    std::cout << "2. Sprite"                    << '\n';
    std::cout << "3. Fanta"                     << '\n';
    std::cout << "4. Miranda"                   << '\n';
    std::cout << "5. Water"                     << '\n';
    std::cout << "Enter your choice: "          << '\n';
    std::cin >> choice;
    return choice;
}

void processRequest(int choice)
{
    switch (choice)
    {
    case 1:
        std::cout << "Thank You, you chose Coke"    << '\n';
        break;

    case 2:
        std::cout << "Thank You, you chose Sprite"  << '\n';
        break;

    case 3:
        std::cout << "Thank You, you chose Fanta"   << '\n';
        break;

    case 4:
        std::cout << "Thank You, you chose Miranda" << '\n';
        break;

    case 5:
        std::cout << "Thank You, you chose Water"   << '\n';
        break;

    default:
        std::cout << "Error. choice was not valid, here is your money back." << '\n';
        break;
    }
}