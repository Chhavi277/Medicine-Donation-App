#include<bits/stdc++.h>
using namespace std;
void reverse(stack<int> &s)
{
	while(!s.empty())
	{
	reverse(s);
	cout<<s.top()<<" ";
	s.pop();
     }
}

int main()
{
	stack<int>s;
	s.push(1);
	s.push(2);
	s.push(3);
	s.push(4);
    s.push(5);
//	s.push(6);
    reverse(s);
}

