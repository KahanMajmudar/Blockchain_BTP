#include <iostream>
#include <math.h>
using namespace std;

int fibonacci(long long int n);

int main() {

	int len_of_rows;
	cin >> len_of_rows;

	for (size_t i = 0; i < len_of_rows; ++i)
	{
		long long int n, j = 0;
		cin >> n;
		long long int result{0};

		result = fibonacci(n);
		// cout << "RESULT________" << result << " ";

		cout << result << " ";
	}

	return 0;
}

int fibonacci(long long int n)
{
	// double phi = (1 + sqrt(5)) / 2;
	// return round(pow(phi, n) / sqrt(5));
	double fib = 2.078087 * log(n) + 1.672276;
	return round(fib);
}