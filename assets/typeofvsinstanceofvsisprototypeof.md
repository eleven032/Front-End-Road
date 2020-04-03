# typeof vs instanceof vs isPrototypeOf()

Description: How them works, what is the result

## typeof

```JavaScript
  typeof 0   // return 'number'
  typeof '0'   //return 'string'，字符串同时也是一个类数组对象
  typeof false  // return 'boolean'
  function fn(){ }
  typeof fn   // return 'function'
  var param;
  typeof param   // return 'undefined'
  typeof Symbol()  // 'symbol'
```

> 在判断‘基本’类型时超级给力，但是复杂一点的对象类型就怂了
> eg:
>
> typeof [1, 2, 3] // return 'object'
>
> typeof null // return 'object'
>
> typeof {x: 1} // return 'object'

## instanceof

所以出现了 instanceof

```JavaScript
  [1, 2, 3] instanceof Array  //return true
  null instanceof Object  // return false
  var obj = {}
  obj instanceof Object   // return true
```

> instanceof 可以检查出 ‘左边’ 是否在 ‘右边’的原型链上
>
> 基于此原理，‘基本类型’ 这些并非 new 出来的类型 instanceof 无法判断

## hasOwnProperty() && isPropertyOf()

```JavaScript
  obj.hasOwnProperty("属性名");//实例obj是否包含有圆括号中的属性,是则返回true,否则是false
```
>只针对自身属性，所有继承而来的属性都会返回false

