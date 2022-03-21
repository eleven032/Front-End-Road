//1. transition影响position：fix
//transform会生一个层叠上下文和一个包含块（containing block）
// ，这个东东会成为fixed定位的子元素的包含块。

//2. 长列表优化
//


//3. 闭包陷阱
//每次render都会产生一个新的闭包函数，我们做一个延时打印， 会是前一个value
//useRef.current记录值，因为并不会随着rerender产生新的值

//4. route权限
//onEnter={一个权限检查函数}

//5. useEffect里面异步请求返回promise不可以
//做法：定义一个function，里面进行setState,同时用一个变量存储结果
//同时在外部call这个function

//6. tree shaking
//它会在运行过程中静态分析模块之间的导入导出，
// 确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，
// 以此实现打包产物的优化。
// ESM : 所有导入都放在最上面

//7.redux mobx
//redux：组件dispatch一个action，
// reducer接收到改变相应的数据，通过props的方式注入到组件中，组件更新。 
// mobx：他和redux类似数据都是单向流动，
// 通过action改变数据，proxy监听数据改变，通知组件进行更新，
// store: redux-大的store; mobx-可以按模块划分
// 储存数据形式区别
// Redux默认以JavaScript原生对象形式存储数据，而Mobx使用可观察对象：
// Redux需要手动追踪所有状态对象的变更；
// Mobx中可以监听可观察对象，当其变更时将自动触发监听；
//操作对象方式不同
//redux里的状态通常是不可修改，是返回一个全新的state/mobx可直接修改


//8. 模块化
// commonJS-
// 同步加载，require没完成不会进行之后的操作，
// 会导致阻塞所以不适合浏览器， 不能并行
//amd,cmd类似， amd前置，cmd按需加载
//es6-编译时就能加载， 
// 譬如一个模块总共1，2，3，4个服务， 某个页面只引入1，2；编译时可以只加载1，2
//运行时加载的话， 就必须全部加载完毕，再导出1，2


//9. setState
//setState 并不是单纯同步/异步的，
//它的表现会因调用场景的不同而不同：
// 在 React 钩子函数及合成事件中，它表现为异步；
// 而在 setTimeout、setInterval 等函数中，
// 包括在 DOM 原生事件中，它都表现为同步。
// 这种差异，本质上是由 React 事务机制和批量更新机制的工作方式来决定的。

//setState 并非真异步，只是看上去像异步。
// 在源码中，通过 isBatchingUpdates 来判断setState 
// 是先存进 state 队列还是直接更新，
// 如果值为 true 则执行异步操作，为 false 则直接更新。
// 那么什么情况下 isBatchingUpdates 会为 true 呢？
// 在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，
// 都会走合并操作，延迟更新的策略。
// 但在 React 无法控制的地方，比如原生事件，具体就是在 addEventListener 、setTimeout、setInterval 等事件中，就只能同步更新。
// 一般认为，做异步设计是为了性能优化、减少渲染次数

//10. canvas
//moveTo(x，y) - 下笔的点
//lineTo(x, y) - 画一条线到坐标点
//stroke() - 线的颜色
//closePath() - 提笔
//问题： 放大缩小会失真
//解决： 动态的设置画布的宽高，防止画布拉伸导致图像失真的情况。

//模块化
// commonJS
// 同步加载，运行时执行，适用于后端，文件都在本地读取很快；不适用于前端
// 导出的是对象，值的拷贝；只有在完整加载完才能生成

// ES6 Module
// 编译时执行；
// 遇到import会生成引用，直到真正使用时才会根据引用取值，更像是对外暴露接口