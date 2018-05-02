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

### 搬移'金额计算'代码
在绝大数情况下，函数应该放在它所使用的数据所属对象内，而amountFor仅仅使用了rental的数据，没有使用customer的数据，所以考虑将amountFor搬移到Rental类，去掉参数并且变更函数名。
代码参见[chapter1 1.3 move method amountFor](https://github.com/shengbowen/learn-refactor/commit/1275dfd5fb5256e7da4282f728fc39d7ce3e6d16)

### repalce temp with query
作者觉得尽量少的使用临时变量，转而使用query(属性访问)比较好，虽然可能存在多次查询，但是也会有优化的方法。
代码参见[chapter1 1.3 replace temp with query](https://github.com/shengbowen/learn-refactor/commit/909ce6b5935cdb74d9feb956f4a521cd7c6288d3)

### 提取'常客积分计算'代码
积分的计算视影片种类而有不同，不过不像收费规则有那么多变化，可以把积分计算放在Rental类中。再来看局部变量，这里再一次用到了rental，另一个临时变量frequentRenterPoints。本例中它在使用之前已经有了初值，但提炼出来的函数并没有读取该值，所以我们不需要将它当做参数传递进去，只需要把新函数的返回值累加上去即可。
代码参见[chapter1 1.3 extract method frequentRenterPoints](https://github.com/shengbowen/learn-refactor/commit/d9a21af059e3514a3d36c3c63c329fbc67e8138d)