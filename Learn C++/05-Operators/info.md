The prefix increment/decrement operators are very straightforward.
First, the operand is incremented or decremented, and then expression evaluates to the value of the operand.

The postfix increment/decrement operators are trickier.
First, a copy of the operand is made. Then the operand (not the copy) is incremented or decremented.
Finally, the copy (not the original) is evaluated


Avoid using operator== and operator!= with floating point operands.

Donald Knuth, a famous computer scientist, suggested the following method in his book -
“The Art of Computer Programming, Volume II: Seminumerical Algorithms (Addison-Wesley, 1969)”:

    #include <cmath> // std::abs
    #include <algorithm> // std::max

    // return true if the difference between a and b is within epsilon percent of the larger of a and b
    bool approximatelyEqual(double a, double b, double epsilon)
    {
        return (std::abs(a - b) <= (std::max(std::abs(a), std::abs(b)) * epsilon));
    }

In this case, instead of epsilon being an absolute number, epsilon is now relative to the magnitude of a or b.


In order for logical AND to return true, both operands must evaluate to true.
If the first operand evaluates to false, logical AND knows it must return false
regardless of whether the second operand evaluates to true or false.
In this case, the logical AND operator will go ahead and return false immediately without even evaluating the second operand!
This is known as short circuit evaluation, and it is done primarily for optimization purposes.

When mixing logical AND and logical OR in a single expression, explicitly parenthesize each operation to ensure they evaluate how you intend.


if (static_cast<bool>(a) != static_cast<bool>(b) != static_cast<bool>(c) != static_cast<bool>(d)) ...
// a XOR b XOR c XOR d, for any type that can be converted to bool