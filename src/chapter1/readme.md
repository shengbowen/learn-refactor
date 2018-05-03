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

### replace temp with getTotalCharge and getTotalFrequent..
这次为了去掉totalAmount、frequentRenterPoints变量，我们引入了2个方法。这次重构带来了2个问题：
1. 代码量增多了
2. 原本只需要执行一次的循环，重构后要执行3次，这可能会带来性能问题，也仅仅是可能，如果没有做评测，无法确定循环的执行时间，也无法知道这个循环是否会经常使用以致于影响系统整体性能。但是重构时我们不需要过分担心这个，优化时再考虑。
代码参见[replace temp with getTotalCharge and getTotalFrequent](https://github.com/shengbowen/learn-refactor/commit/527708dfe2bd7def3d82d68f4f385a7aa3627c9b)

### 添加功能
经过前面的重构，你会发现Customer类的一些查询接口，可以方便的被复用，这样就可以省去自建循环代码。我们可以很容易的写一个扩展功能，htmlStatement。你可以很清楚的看见二者的区别[chapter1 1.3 add htmlStatement](https://github.com/shengbowen/learn-refactor/commit/46fb565a96ad5a73a03bfb7e9a4a3773969d15c7)

## 1.4 运用多态取代与价格相关的条件逻辑

### move getCharge and getFrequentPoints
最好不要在另一个对象的属性基础之上运用switch语句，如果不得不使用，也应该在自己的数据上使用。这暗示要把getCharge移到Movie里去。为什么选择将租期传给Movie对象，而不是将影片类型传给Rental对象呢？因为本系统可能发生的变化时加入新影片类型，为了尽量控制它带来的影响，选择在Movie里计算费用。
代码参见[move getCharge and getFrequentPoints](https://github.com/shengbowen/learn-refactor/commit/de99635ed59a07f777e4f41d7f9e25362c3db316)

### 使用继承和策略模式
也行你会想到运用多态，为每个电影类型创建一个子movie类，但是一部影片可以在生命周期内修改自己的分类，而一个对象却不能再生命周期内修改自己所属的类，所以不适合设计多个movie子类。不过可以将getCharge方法看做一个策略，新建不同的策略子类来应对不同的计算方法是可行。为了引入策略模式，首先我们[replace type code with state/strategy](https://github.com/shengbowen/learn-refactor/commit/ed1511dc323c4db02bf54557b717a54098306707)

### 搬移 getCharge
现在我们可以将Movie里的getCharge方法，搬移到priceStrategy里。[move getcharge](https://github.com/shengbowen/learn-refactor/commit/c125c7f7577ad4ab4128110a2f1a6cbd0bd8845c)

### replace conditional with polymorphism
搬移之后，就可以运用多态，将getCharge 里的 switch，搬移到子类的getCharge里。[replace conditional with polymorphism](https://github.com/shengbowen/learn-refactor/commit/bec81b0f5e7ab5c9a6467877986c83a754346b47)
最后使用同样的方法，搬离getFrequentRenterPoints。