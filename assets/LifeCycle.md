# life cycle of components

Description: Detail about life cycle

## 上图

![](https://user-gold-cdn.xitu.io/2019/1/21/1686f53332679e47?imageslim)

知识点:

> 我们把 React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载（这个定义请好好记住）

## 创建时

### constructor 构造函数

在 React 组件挂载之前被调用，实现 React.Component 的子类的构造函数时，要在第一行加上 super(props)。
