#include<bits/stdc++.h>
using namespace std;
int main()
{
	deque<int>q;
	vector<int>ans;
	int k;
	int n;
	cin>>n;
	cin>>k;
	int a[n];
	for(int i=0;i<n;i++)
	{
		cin>>a[i];
	}
	for(int i=0;i<k;i++)
	{
		while(!q.empty()&&a[q.back()]<a[i])
		{
			q.pop_back();
		}
		q.push_back(i);
	
	}
		ans.push_back(a[q.front()]);
		for(int i=0;i<k;i++)
		{
			if(q.front()==i-k)
			{
				q.pop_front();
			}
				while(!q.empty()&&a[q.back()]<a[i])
					{
			q.pop_back();
		}
		q.push_back(i);
	
			ans.push_back(a.[q.front()]);
	}
		for(auto i:ans)
		{
			cout<<i<<" ";
		}
		}
	

