#include <iostream>

int isPrime(int num)
{
    bool result{ true };
    for (size_t i = 2; i < num/2; i++)
    {
        if (num%i == 0)
        {
            result = false;
            break;
        }
    }

    return result;

}

int main()
{
    std::cout << "Enter a number: ";
    int x{ 0 };
    std::cin >> x;
    if (isPrime(x))
    {
        std::cout << x << " is a prime number";
    }
    else
    {
        std::cout << x << " is not a prime number";
    }

}