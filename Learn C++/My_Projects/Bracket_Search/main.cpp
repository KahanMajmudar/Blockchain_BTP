#include "main.h"
#include <ctime>
#include <iostream>

int main()
{
    int guess{};
    int gen_num{ genRandNum() };
    std::cout << gen_num << '\n';

    // userGuess(guess, gen_num);
    computerGuess();

    return 0;
}

int genRandNum()
{
    srand((unsigned) time(0));
    return (rand() % 100) + 1;
}

void userGuess(int guess, int gen_num)
{
    static int counter{0};
    while (guess != gen_num)
    {
        ++counter;
        std::cout << "Enter your guess: ";
        std::cin >> guess;
        if (guess > gen_num)
        {
            std::cout << "Too High!!"   << '\n';
        }
        else if (guess < gen_num)
        {
            std::cout << "Too Low!"     << '\n';
        }
        else
        {
            std::cout << "Correct!!, You took " << counter << " guesse(s)\n";
        }
    }
}


void computerGuess()
{
    int gen_num{};
    int user_guess{};
    static int counter{0};
    int min{1};
    int max{100};
    std::cout << "Enter the number you want the computer to guess between 1 and 100: ";
    std::cin >> user_guess;

    while (gen_num != user_guess)
    {
        ++counter;
        gen_num = (min + max) / 2;
        std::cout << "Your Guess is: " << gen_num << '\n';

        if (gen_num > user_guess)
        {
            max = gen_num;
        }
        else if (gen_num < user_guess)
        {
            min = gen_num + 1;
        }
        else
        {
            std::cout << "Correct!!, I took " << counter << " guesse(s)\n";
        }
    }
}