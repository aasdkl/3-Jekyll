#include <stdio.h>
#include <stdlib.h>//malloc和free在这里面

int main()
{
	int *A;
//  此时我们只是声明了一个变量，A(Add:Val),其指向的(Val:Val2)没有声明
	printf("%p\n", A);
//  无论A是不是一个空指针，*A都会出现错误
//	printf("%d\n", *A);
//  (nil)代表指针未指向任何有意义的地址，是一种特殊标识.
	A = NULL;
	printf("%p\n", A);
	A = 0;
	printf("%p\n", A);

//  申请新的地址如下
	A = (int *)malloc(sizeof(int));
//  malloc会以byte为单位申请一段连续的空间，这里需要前面加上一个类型转换使其变为以(int *)
//	为单位。
	*A = 20;
	printf("%p %d\n", A, *A);
//  申请过的内存要自己释放
	free(A);

	int B = 20;
	printf("%p\n", &B);
	A = &B;
	*A = 10;
	printf("%p %d\n", A, *A);

//  数组和指针有相通之处
	char str1[20], *str2;
	str2 = (char *)malloc(sizeof(char)*20);
	*(str1 + 10) = 'c';
	str2[12] = 'a';
	printf("%c %c\n", str1[10], *(str2 + 12));
//	因而指针可以用来申请一个长度未知的数组

	return 0;
}
