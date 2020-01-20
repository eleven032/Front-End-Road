# USE STRICK

Description: Some rules about USE STRICK

## 变量必须声明才能使用

&emsp; 在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种写法

## 禁止使用 with 语句

&emsp; 因为 with 语句无法在编译时就确定，属性到底归属于哪个对象，严格模式有利于编译效率提高

### 详解

1. with 是什麽？

   比如，目前现在有一个这样的对象：

   ```JavaScript
   var obj = {
     a: 1,
     b: 2,
     c: 3
   };
   ```

   如果想要改变 obj 中每一项的值，一般写法能会是这样：

   ```JavaScript
   // 重复写了 3 次的“obj”
   obj.a = 2;
   obj.b = 3;
   obj.c = 4;
   ```

   而用了 with 的写法，会有一个简单的快捷方式

   ```JavaScript
   with (obj) {
     a = 3;
     b = 4;
     c = 5;
   }
   ```

   在这段代码中，使用了 with 语句关联了 obj 对象. 在 with 代码块内部，每个变量首先被认为是一个局部变量，如果局部变量与 obj 对象的某个属性同名，则这个局部变量会指向 obj 对象属性。

2. 弊端

   不知道你有没有发现上面这句话 ---**_如果局部变量与 obj 对象的某个属性同名，则这个局部变量会指向 obj 对象属性。_**--- 那如果局部变量无法与 obj 中的每一个词属性 match 会发什么情况？

   先看一段代码

   ```JavaScript
   function foo(obj) {
    with (obj) {
      a = 2;
    }
   }
   var o1 = {
    a: 3
   };
   var o2 = {
    b: 3
   }

   foo(o1);
   console.log(o1.a); //2

   foo(o2);
   console.log(o2.a); //underfined

   console.log(a); //2，a 被泄漏到全局作用上
   ```

   直接先告诉你们结果，a 被误创建为了全局变量。为什么？需要提前了解一下 [LHS,RHS](LHS_RHS.md) 相关知识.

   > 当我们传递 o2 给 with 时，with 所声明的作用域是 o2, 从这个作用域开始对 a 进行 LHS 查询。o2 的作用域、foo(…) 的作用域和全局作用域中都没有找到标识符 a，因此在非严格模式下，会自动在全局作用域创建一个全局变量，在严格模式下，会抛出 ReferenceError 异常。

## 创建 eval 作用域

> - 正常模式下，Javascript 语言有两种变量作用域（scope）全局作用域和函数作用域。
>
> - 严格模式创设了第三种作用域：eval 作用域。

> - 正常模式下，eval 语句的作用域，取决于它处于全局作用域，还是处于函数作用域。
> - 严格模式下，eval 语句本身就是一个作用域，不再能够生成全局变量了，它所生成的变量只能用于 eval 内部。

```JavaScript
  "use strict";
　var x = 2;

　console.info(eval("var x = 5; x")); // 5

　console.info(x); // 2
```

## 创建 eval 作用域

禁止 this 关键字指向全局对象(严格模式下全局作用域中定义的函数中的 this 为 undefined)

```JavaScript
　  function f(){
　　　　return !this;
　　}
　　// 返回false，因为"this"指向全局对象，"!this"就是false

　　function f(){
　　　　"use strict";
　　　　return !this;
　　}
　　// 返回true，因为严格模式下，this的值为undefined，所以"!this"为true。
```

## 禁止在函数内部遍历调用栈

caller, arguments

```JavaScript
　function f1(){
    "use strict";
    f1.caller; //报错
    f1.arguments; //报错
  }

  f1();
```

## 严格模式下无法删除变量。只有 conifgurable 设置为 true 的对象属性才能被删除

```JavaScript
　"use strict"

  var x ;

  delete x; //严格模式下报语法错误

  var o = Object.create(null,{'x':{

    value: 1,

    configurable: true

  }})

  delete o.x; //删除成功
```

## 显示报错（正常模式下对一个对象的只读属性进行赋值，不会报错，只会默默失败。严格模式下将报错）

```JavaScript
"use strict";

var o = {};

Object.defineProperty(o,"v",{value: 1,writable: false});

o.v = 2; //报错，因为o.v属性是不能被修改的，严格模式会报错，正常模式会失败但不报错
```

## 严格模式下，对禁止扩展的对象添加新属性，会报错

```JavaScript
"use strict";

var o = {};

Object.preventExtensions(o);//禁止o对象有拓展属性

o.v = 1; //报错
```

## 严格模式下，删除一个不可删除的属性，报错

```JavaScript
"use strict";
delete Object.prototype; //报错
```

## 对象拥有多个同名属性，严格模式报错。正常模式会默认值为最后一个

## 函数不能有重名的参数，严格模式会报错，正常模式可以通过 arguments[i]来获取对应的参数

## 禁止八进制写法，正常情况下整数第一位为 0 代表八进制，严格模式下整数第一位为 0 则报错

## 不准对 arguments 赋值

## 严格模式下的 arguments 不在追踪参数的变化

```JavaScript
function fn(a){
    a=2;
    return [a,arguments[0]];
}
fn(1); //正常模式返回值 [2,2]

"use strict"
function fn(a){
    a = 2;
    return [a,arguments[0]];
}
fn(1); //严格模式返回值 [2,1] 参数传进来是多少就是多少，arguments不会变化
```

## 禁止使用 arguments.callee（无法在匿名函数内部调用自身了。arguments.callee 指向的就是该函数本身）

```JavaScript
var f = function (){
    return arguments.callee;
}
f(); //报错
```
