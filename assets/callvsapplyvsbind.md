# call vs apply vs bind

Description: How them works, what is the result

## call && apply

```JavaScript
function hello(name,age){
  console.log(name);
  console.log(age);
}
hello.call(this,"tsrot",24);//this指的是hello这个对象
hello.apply(this,["tsrot",24]);
```

> call 一个一个传入参数

> apply 传入数组

## bind

```JavaScript
var obj = {
    x: 81,
};
var foo = {
    getX: function() {
        return this.x;
    }
}
console.log(foo.getX.bind(obj)());
console.log(foo.getX.call(obj));
console.log(foo.getX.apply(obj));
```

> 一个一个传入参数

> 需要进行调用才能执行
