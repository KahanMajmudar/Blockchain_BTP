#include <iostream>

int main()
{
    std::cout << "Enter a integer: ";
    int smaller{0};
    std::cin >> smaller;

    std::cout << "Enter a larger integer: ";
    int larger{0};
    std::cin >> larger;

    if (larger < smaller)
    {
        int temp{0};
        std::cout << "Swapping values..." << '\n';

        temp = smaller;
        smaller = larger;
        larger = temp;

    }   // temp dies

    std::cout << "The smaller value is: " << smaller << '\n';
    std::cout << "The larger value is: "  << larger  << '\n';

    return 0;
}   // larger dies, then smaller dies
