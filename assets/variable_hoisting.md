# Variable/Function hoisting

## What is it

> 通常 JS 引擎会在正式执行之前先进行一次预编译，在这个过程中，首先将变量声明及函数声明提升至 **_---当前作用域的顶端---_**，然后进行接下来的处理。
>
> (注：当前流行的 JS 引擎大都对源码进行了编译，由于引擎的不同，编译形式也会有所差异，我们这里说的预编译和提升其实是抽象出来的、易于理解的概念)

### 实例

```javascript
//var
function f() {
  console.log(a); //undefined
  var a = 10;
  console.log(a); //10
}
f();
```

再看下一个

```javascript
//let
function f() {
  console.log(a); //ReferenceError
  let a = 10;
  console.log(a); //10
}
f();
```

奇怪了，难道 let 没有被提升吗？

答案：被提升了，
先看一个概念：

> TDZ：在此作用域中用 let、const 声明的变量会在该作用域中先创建，但这个时候还没有进行词法绑定，没有进行对声明语句的求值运算，所以是不能访问的，访问会抛出错误。所以在这运行流程一进入作用域创建变量，到变量开始可被访问的一段时间，就称为 TDZ。

看以下示例：

```javascript
let a = 1;
{
  a = 2; //ReferenceError
  let a;
}
```

如果没有提升，报错位置不应该在 a=2 这里，而是 let a, 因为 a 已经被声明过。

很明显，这代表了首先 let 是块级作用域，里面的 a 被提升到块级顶端与外层 a 互不相干，并且产生 ReferenceError。

### 对比

基本概念：

创建：let a; var a; const a
初始化：var 会被初始化为 undefined，let/const 只有见到 'a=X' 才算是被初始化
赋值：var 见到 '=' 算是赋值; let 同上，所以对于 let/const 有时候初始化，赋值是在一步进行的

1. let 的「创建」过程被提升了，但是初始化没有提升。（此时变量进入暂时死区）
2. var 的「创建」和「初始化」都被提升了。
3. function 的「创建」「初始化」和「赋值」都被提升了。
4. const 和 let 只有一个区别，那就是 const 只有「创建」和「初始化」，没有「赋值」过程。（也会进入暂时死区）。
