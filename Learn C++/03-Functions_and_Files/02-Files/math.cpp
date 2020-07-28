int add(int x, int y)
{
    return x + y;
}

int sub(int x, int y)
{
    // if (x > y)
    // {
    //     return x - y;
    // }
    // else
    // {
    //     return y - x;
    // }
    return x > y ? x - y : y - x;

}

int mul(int x, int y)
{
    return x * y;
}
