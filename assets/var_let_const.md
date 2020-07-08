# Var Let Const

Description: What's the difference between each others

## Var

### Features

1. 如果在最外层声明变量，则直接成为全局变量。
   ```javascript
   var a = [];
   for (var i = 0; i < 10; i++) {
     a[i] = function() {
       console.log(i);
     };
   } //10 10 10 10 10
   console.log(i); //10
   //var变量在for中的声明在外头可以访问到;
   ```
2. 如果非在最外层，则是函数级作用域。
   ```javascript
   function world() {
     var abc = "hello";
     console.log(abc);
   }
   world(); // hello
   console.log(abc); // ReferenceError: abc is not defined  在函数外面访问不到
   ```
3. 变量会[提升](variable_hoisting.md)
   ```javascript
   例子1.a=10  //undefined var a
   例子2.var a = 10;
   function f1(){
   console.log(a); //undefined
   var a = 20; //var a 提升到该作用域顶部
   console.log(a); // 20
   }
   f1()
   ```
4. 可重复声明

   ```javascript
   var x=1 var x=2
   ```

### 经典问题：

```JavaScript
for(var i = 0;i < 5; i++){
   setTimeout(() => {
       console.log(i);
   }, 1000)
}
```

打出了: 5 5 5 5 5

```JavaScript
  for(var i = 0;i < 5; i++){
      console.log(i);
  }
```

打出了: 0 1 2 3 4

其实或多或少有点理解

var 已经将变量升级为全局变量，除了页面被关闭或者人为清除，不然将会一直保存在内存中，所以第一段代码中的 i 在被引用并打印时，值已经累加到 5，访问的也是 5.

但是为什么不进行操作直接打印 i 会是正常的 0，1，2，3，4. 因为在引用的时候当前 i 还停留在最后一次累加的值的位置,然后进入下一次 loop.

## let

### Features

1. 块作用域

```javascript
{
  let a = 0;
}
console.log(a); //ReferenceError: a is not defined
```

每个 let 绑定自身所在的块作用域，且只能在块作用域中访问到

2. 不可被重新声明
   ```javascript
   let abc = "hello";
   let abc = "world"; // SyntaxError: redeclaration of let abc
   ```
   区别于 var
3. 暂时性死区  
   在声明之前使用会报错
   ```javascript
   console.log(a); //ReferenceError: a is not defined
   let a = 0; //在声明之前的语句为暂时性死区复制代码
   ```
4. 导致 typeof 不安全
   ```javascript
   //正常情况 一个变量没有声明前使用 typeof 结果为 undefined
   typeof b; //undefined
   //在暂时性死区内使用 typeof，会报错
   typeof c; //报错 let c
   ```

### 继续经典问题：

```JavaScript
  for(let i = 0;i < 5; i++){
      setTimeout(() => {
          console.log(i);
      }, 1000)
  }
```

在这种情况下，结果是 0，1，2，3，4  
根据所查询到的资料：

> ```JavaScript
> for(let i = 0; i< 5; i++)
> ```
>
> 这句话的圆括号之间，有一个隐藏的作用域（用 var 时没有）。
>
> ```JavaScript
> for(let i = 0; i< 5; i++) { code }
> ```
>
> 在每次执行循环体之前，JS 引擎会把 i 在循环体的上下文中重新声明及初始化一次。

再回到上面代码，根据资料，完整的代码应该如下：

```JavaScript
  for(let i = 0;i < 5; i++){
    let i = "作用域中的i";
    setTimeout(() => {
        console.log(i);
    }, 1000)
  }
```

> setTimeout 里的 fun 引用了外部 i 变量，形成一个闭包，每个 i 都被保存了下来，而没有被销毁。

## const

### Features

1. 不可修改

   ```javascript
   const a = 1;
   a = 2; //报错
   ```

   并非真正意义上的不可修改，而是 const 指向的内存地址不可改变，并不是 const 的值不可改变

   ```javascript
   const a={}
   a.name='xxx'a.age='21' //可以运行

   const b=[]
   b.push('xxx')//可以运行
   ```

   取消这一特性，可以通过 const c=Obeject.freeze({})来实现

2. 块作用域，暂时性死区这点与 let 相同
3. 声明时必须赋值
   ```javascript
   const a //报错
   ```
   const 声明时必须赋值，否则报错

## 对比
1. let 的「创建」过程被提升了，但是初始化没有提升。（此时变量进入暂时死区）
2. var 的「创建」和「初始化」都被提升了。
3. function 的「创建」「初始化」和「赋值」都被提升了。
4. const 和 let 只有一个区别，那就是 const 只有「创建」和「初始化」，没有「赋值」过程。（也会进入暂时死区）。
