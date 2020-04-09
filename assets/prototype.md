# Prototype and Inherit

Description: how the inherit works in this system

---
### Prototype是什麽

先看一个例子：
```JavaScript
function Dog(name, color) {
    this.name = name
    this.color = color
    this.bark = () => {
        console.log('wangwang~')
    }
}

const dog1 = new Dog('dog1', 'black')
const dog2 = new Dog('dog2', 'white')
```
可以看出来，每创建一个实例，bark也会被重新创建一次。函数也是一个对象，每次创建都会消耗空间。这样不行！！！

这个时候，prototype就成为了解决方法
>prototype是函数function的一个默认存在的属性，是一个对象。
>所有的需要共享的属性或者方法都可以存放在此

对比一下两种形式：
 - 如果bark在构造函数里，则每一个实例在调用时是调用自身所有的bark function
 - 如果bark在prototype里，则每一个实例在调用时，都是调用同一个prototype里的bark function

另外：
每一个被创建出来的实例也都会含有一个默认的属性.\_\_proto\_\_ ,他的指向是指向为prototype对象

所以具象化为下图：
  ![prototype](Resources/JS-Foundations/prototype.png)
human是一个构造函数function，它的prototype属性指向一个prototype实例obj

每一个实例如person1都有一个\_\_proto\_\_属性，他也指向prototype实例obj

回到上述代码例子，我们以prototype的形式走一边
```JavaScript
function Dog(name, color) {
    this.name = name
    this.color = color
}

Dog.prototype.bark = () => {
    console.log('wangwang~')
}
```

OK,那我现在想要对这个方法进行修改
```JavaScript
const dog2 = new Dog('dog2', 'white')
dog2.bark() = () => {
    console.log('miaomiaomiao???')
}
dog1.bark()  //'wangwang~'
dog2.bark()  //'miaomiaomiao???'
```
dog1并没有受到影响，因为dog2重写bark方法的操作实际上是为自己添加了一个新的方法使原型中的bark方法被覆盖了，而并非直接修改了原型中的方法。

简而言之，dog2这个实例中，多了一个bark()的属性。只有修改prototype obj里的bark，才会做到影响所有实例对象

>Note: 
访问对象的属性时，JavaScript会首先在对象自身的属性内查找，若没有找到，则会跳转到该对象的原型对象中查找。

---

### 如何形成继承链

