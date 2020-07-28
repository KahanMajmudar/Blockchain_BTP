#include <iostream>

int main()
{

    float x{ 3.1415 };
    double y = { 2.71 };
    long double z = { x * y };

    std::cout << "Float is: "       << x << '\n';
    std::cout << "Double is: "      << y << '\n';
    std::cout << "Long Double is: " << z << '\n';

    bool y_n { true };

    std::cout << "Boolean is: "     << y_n << '\n';

    char a { 'a' };
    wchar_t b { 'b' };
    // char8_t c;   C++20
    char16_t d { 'd' };
    char32_t e { 'e' };

    std::cout << "char is: "        << a << '\n';
    std::cout << "wchar_t is: "     << b << '\n';
    std::cout << "char16_t is: "    << d << '\n';
    std::cout << "char32_t: "       << e << '\n';

    short s { 10 };
    int i { -36 };
    long l { 572 };
    long long L { -65565 };

    std::cout << "Short is: "       << s << '\n';
    std::cout << "Int is: "         << i << '\n';
    std::cout << "Long is: "        << l << '\n';
    std::cout << "Long Long is: "   << L << '\n';

    std::nullptr_t np {};

    // std::cout << "Null pointer is: " << np << '\n';

    std::cout << "\n\nSize of variables: " << "\n\n";

    std::cout << "bool:\t\t"        << sizeof(bool)         << " bytes\n";
    std::cout << "char:\t\t"        << sizeof(char)         << " bytes\n";
    std::cout << "wchar_t:\t"       << sizeof(wchar_t)      << " bytes\n";
    std::cout << "char16_t:\t"      << sizeof(char16_t)     << " bytes\n"; // C++11 only
    std::cout << "char32_t:\t"      << sizeof(char32_t)     << " bytes\n"; // C++11 only
    std::cout << "short:\t\t"       << sizeof(short)        << " bytes\n";
    std::cout << "int:\t\t"         << sizeof(int)          << " bytes\n";
    std::cout << "long:\t\t"        << sizeof(long)         << " bytes\n";
    std::cout << "long long:\t"     << sizeof(long long)    << " bytes\n"; // C++11 only
    std::cout << "float:\t\t"       << sizeof(float)        << " bytes\n";
    std::cout << "double:\t\t"      << sizeof(double)       << " bytes\n";
    std::cout << "long double:\t"   << sizeof(long double)  << " bytes\n";

    // Favor the std::int_fast#_t and std::int_least#_t integers when you need an integer guaranteed to be at least a certain minimum size.
    // Favor double over float unless space is at a premium, as the lack of precision in a float will often lead to inaccuracies.

    // INF stands for infinity, and IND stands for indeterminate.

    // std::cout << std::boolalpha; // print bools as true or false

    return 0;
}