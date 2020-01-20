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
