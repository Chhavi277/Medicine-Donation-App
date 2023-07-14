#include<bits/stdc++.h>
using namespace std;
int main()
{
	int n;
	cin>>n;
	int b[n];
	int a[n];
	for(int i=0;i<n;i++)
	{
		cin>>a[i];
	}
	for(int i=0;i<n-2;i++)
	{
		b[i]=max(a[i],a[i+1]);
		b[i]=max(b[i],a[i+2]);
	}
	for(int i=0;i<n;i++)
	{
		cout<<b[i]<<" ";
	}
}
