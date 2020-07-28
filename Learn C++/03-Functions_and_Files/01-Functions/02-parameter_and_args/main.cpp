#include <iostream>

// forward declaring a function that is yet to be defined
int newFunction(int x, int y);
void printSquare(int num);
int getUserValue();

int add(int num1, int num2)
{
    return num1 + num2;
}

int multiply(int num1, int num2)
{
    return num1 * num2;
}

int main()
{
    // int num{ getUserValue() };
    // printSquare(num);

    // or

    printSquare( getUserValue() );


    std::cout << add(2, 5) << '\n';
    std::cout << add(1 + 3, 6 + 8) << '\n';
    std::cout << add(4, multiply(2, 9)) << '\n';
    std::cout << add(5, add(4, 7)) << '\n';
    std::cout << multiply(multiply(2, 4), multiply(6, 5)) << '\n';
    std::cout << newFunction(2, 2) << '\n';

    return 0;
}


int newFunction(int x, int y)
{
    return x % y;
}

// someFunction(a(), b()); // a() or b() may be called first


// int avar{ a() }; // a() will always be called first
// int bvar{ b() }; // b() will always be called second

// someFunction(avar, bvar); // it doesn't matter whether avar or bvar are copied first because they are just values


// Local variables are destroyed in the opposite order of creation at the end of the set of curly braces in which it is defined
// (or for a function parameter, at the end of the function).



// Organization -- As programs grow in complexity, having all the code live inside the main() function becomes increasingly complicated. A function is almost like a mini-program that we can write separately from the main program, without having to think about the rest of the program while we write it. This allows us to reduce a complicated program into smaller, more manageable chunks, which reduces the overall complexity of our program.
// Reusability -- Once a function is written, it can be called multiple times from within the program. This avoids duplicated code (“Don’t Repeat Yourself”) and minimizes the probability of copy/paste errors. Functions can also be shared with other programs, reducing the amount of code that has to be written from scratch (and retested) each time.
// Testing -- Because functions reduce code redundancy, there’s less code to test in the first place. Also because functions are self-contained, once we’ve tested a function to ensure it works, we don’t need to test it again unless we change it. This reduces the amount of code we have to test at one time, making it much easier to find bugs (or avoid them in the first place).
// Extensibility -- When we need to extend our program to handle a case it didn’t handle before, functions allow us to make the change in one place and have that change take effect every time the function is called.
// Abstraction -- In order to use a function, you only need to know its name, inputs, outputs, and where it lives. You don’t need to know how it works, or what other code it’s dependent upon to use it. This lowers the amount of knowledge required to use other people’s code (including everything in the standard library).


// defination --> actual implementation
// declaration --> tells complier about existence