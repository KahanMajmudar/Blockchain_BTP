#include <iostream>

int main()
{
    int counter{ -1 };
    int num{ 0 };

    while (num != counter && counter != 10)
    {
        std::cout << "Enter a number other than " << counter+1 << ": ";
        std::cin >> num;
        counter++;
    }


    if (counter == 10)
    {
        std::cout << "Wow, you're more patient then I am, you win.";
    }
    else
    {
        std::cout << "Hey! you weren't supposed to enter " << num;
    }


    return 0;

}

