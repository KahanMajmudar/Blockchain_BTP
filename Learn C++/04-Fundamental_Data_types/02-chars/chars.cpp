#include <iostream>

int main()
{
    char ch1{ 'a' };
    std::cout << ch1 << '\n';
    std::cout << ch1 << " has ASCII code: " << static_cast<int>(ch1) << '\n';

    char ch2{ 98 };         // not preferred
    std::cout << ch2 << '\n';
    std::cout << ch2 << " has ASCII code: " << static_cast<int>(ch2) << '\n';

    std::cout << "Enter sequence of chars: ";
    char chars{};

    do {

        std::cin >> chars;
        std::cout << chars << " has ASCII code: " << static_cast<int>(chars) << '\n';

    } while (std::cin.peek() != '\n');

    std::cout << "THANK \t YOU";

    return 0;

}