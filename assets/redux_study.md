# Redux Study Note

1. component需要对state发生改变
2. component向Action Creators发送获取state的请求
3. Action Creators本身并没有存储state,去向Store里发送请求
4. Store里其实也没有,也要向Reducers里面去寻找
5. Reducers里找到并做了更新,返回给Stores
6. component最终从Store里找到更新后的state

---

