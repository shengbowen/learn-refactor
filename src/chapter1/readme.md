# 1.重构，第一个案例

## 1.1 起点
初始化的代码为[3个类文件](https://github.com/shengbowen/learn-refactor/commit/6d5a5c645b80b10c83a1bea42ae2a9983454e270)
可以看到Customer里的statement方法太长，并且无法复用，如果需求是输出一段html文本，我们需要另外编写一个htmlStatement。这会导致修改逻辑时要维护2份代码。

![1-2]('/img/1-2.jpeg')
## 1.2 编写测试
重构的第一步是要为代码编写测试，这样有效避免我们重构时引入bug。
## 1.3 分解并重组statement
### 提取方法
首先找到代码里的逻辑泥团switch，将它提炼成方法比较好，并且发现逻辑中包含不变变量this.rentals[i]，以及变化变量thisAmount。将rental作为函数参数，并返回thisAmount的值是正确的选择。
代码参见[chapter1 1.3: extract method amountFor](https://github.com/shengbowen/learn-refactor/commit/f97cafe5d83e2e376e1e1e4cecd27ec6a3829d31)

