#include <stdio.h>

struct node {
	struct node *P;
	int x, y;
};

int main()
{
	struct node A;
	A.P = &A;
	A.P->x = 2;
	(*(A.P)).y = 1;
	printf("%d %d\n", A.x, A.y);
//
	struct node B;
	B.P = A.P;
	B.x = 10;
	printf("%d %d\n", B.P->x, B.x);
	return 0;
}
