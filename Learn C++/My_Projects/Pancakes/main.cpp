#include "main.h"
#include <algorithm>
#include <iostream>
#include <vector>

int main()
{

    int pancakes[10];
    int len_arr = sizeof(pancakes)/sizeof(pancakes[0]);

    for (size_t i = 0; i < len_arr; i++)
    {
        std::cout << "Enter number of user_array eaten by person " << i+1 << ": ";
        std::cin >> pancakes[i];
    }

    findMax(len_arr, pancakes);
    findMin(len_arr, pancakes);
    sortDescending(len_arr, pancakes);

}


void findMax(int len_user_array, int user_array[])
{
    // int len_arr = sizeof(user_array)/sizeof(user_array[0]);
    int max = user_array[0];
    int counter{0};

    for (size_t i = 0; i < len_user_array; i++)
    {
        if (user_array[i] > max)
        {
            max = user_array[i];
            counter = i+1;
        }

    }

    std::cout << "\nMax pancakes eaten are " << max << " by Person " << counter <<'\n';
}

void findMin(int len_user_array, int user_array[])
{
    // int len_arr = sizeof(user_array)/sizeof(user_array[0]);
    int min = user_array[0];
    int counter{0};

    for (size_t i = 0; i < len_user_array; i++)
    {
        if (user_array[i] < min)
        {
            min = user_array[i];
            counter = i+1;
        }

    }

    std::cout << "\nMin pancakes eaten are " << min << " by Person " << counter <<"\n\n";
}


void sortDescending(int len_user_array, int user_array[])
{
    std::vector<std::pair<int, int> > vp;

    for (size_t i = 0; i < len_user_array; ++i) {
        vp.push_back(std::make_pair(user_array[i], i));
    }

    std::sort(vp.begin(), vp.end());

    for (size_t j = 0; j < vp.size(); j++)
    {
        std::cout << "Person " << vp[j].second + 1 << " :ate " << vp[j].first << " pancakes" << '\n';
    }

}