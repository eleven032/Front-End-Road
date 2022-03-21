//发布订阅者
class eventEmitter {
    constructor(){
        this.events = {}
    }
    //cb:{id:xxx, cb:function}
    subscribe(type, cb) {
        if(!this.event[type]) {
            this.events[type] =[];
        }
        this.events[type].push(cb);
    }

    publish(type) {
        if(this.events[type]){
            if(arguments.length) {
                this.events[type].forEach(cb=>cb.cb(...arguments))
            } else {
                this.events[type].forEach(cb=>cb.cb())
            }
        }
    }

    unsubscribe(type, cb) {
        if(this.events[type]) {
            if(this.events[type].length===0) {
                delete this.events[type];
            } else {
                const index = this.events[type].findIndex(item=> item.id ===cb.id);
                this.events[type].splice(index, 1)
            }
        }
    }
}

//观察者
class Observer {
    constructor(id) {
        this.id = id;
    }
    
    callback(message) {
        if(message.type === 'event') {
            console.log(message.info);
        }
        if(message.type === 'task') {
            console.log(message.info)
        }
        //...自由补充
    }
    
    getId() {
        return this.id;
    }
}


class Subject {
    constructor() {
        this.observerList = []
    }
    
    add(observer) {
        const index = this.observerList.findIndex(ob => ob.getId() === observer.getId())
        if(index<0) {
            this.observerList.push(observer)
        }
    }
    
    publish(message) {
        console.log('publish')
        this.observerList.forEach(ob => ob.callback(message))
    }
}


const subject = new Subject(); 
const p1 = new Observer(1); 
const p2 = new Observer(2);

subject.add(p1);
subject.add(p2);
const message1 = {
    type: 'task', 
    info: 'new task happened'
}
const message2 = {
    type: 'event', 
    info: 'new message happened'
}
subject.publish(message1);
subject.publish(message2);
//单例
//树的遍历
function dfs (root) {
    const result = [];
    if(!root) return result;
    const queue = [root];
    while(queue.length!==0) {
        const node = queue.pop();
        result.push(node);
        if(node.children&&node.children.length!==0) {
            for(let i = node.children.length-1; i>=0; i--) {
                queue.push(node.children[i]);
            }
        }
    }
    return result;
}


class eventEmitter {
    constructor(){
        this.events = {}
    }
    add(type) {
        if(!this.events[type]) {
            this.events[type] = [cb];
        } 
    }

    sub(type, cb){
        if(this.events[type]) {
            this.event.push(cb)
        } else {
            this.events[type] = [cb];
        }
    }

    pub(type) {
        if(this.events[type]) {
            this.events[type].forEach(cb=>cb())
        }
    }

    remove
}

function debounce(func, wait = 666) {
    let timer;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this, arguments)
        }, wait)
    }
}

function throttle(func, wait=666) {
    let timer;
    return function() {
        if(!timer) {
            timer = setTimeout(()=>{
                func.apply(this, arguments);
                clearTimeout(timer);
            }, wait)
        }
    }
}

Array.prototype.myReduce = function(cb, acc) {
    const arr = this;
    for(let i=0;i<arr.length; i++) {
        const value = arr[i];
        acc = cb(acc, value, i , arr)
    }
    return acc;
}


class eventEmitter {
    constructor() {
        this.events = {}
    }

    add(type) {
        if(!this.events[type]) {
            this.events[type] = []
        }
    }

    sub(type, cb) {
        if(this.events[type]) {
            this.events[type].push(cb)
        }
    }

    pub(type) {
        if(this.events[type]){
            this.events[type].forEach(cb => cb())
        }
    }


}


class Subject {
    constructor() {
        this.observerList = []
    }

    add(observer) {
        this.observerList.push(observer)
    }

    pub() {
        this.observerList.forEach(ob => ob.cb())
    }
}

class Observer {
    constructor(){

    }

    cb() {
        console.log('do something');
    }
}

function deepClone (obj, map = new Map()) {
    if (typeof obj !== "object") {
        return obj;
    }
    if(map.get(obj)) {
        return map.get(obj)
    }
    let result;
    Array.isArray(obj) ? result = []:{}
    map.set(obj, result);
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key], map);
        }
    }
    return result;
}

function deep (obj, map = new Map()) {
    if(typeof obj !=='object') return obj;
    if(map.get(obj)) return map.get(obj);
    let result = Array.isArray(obj)?[]:{}
    map.set(obj, result);
    for(let key in obj) {
        if(obj.hasOwnProperty(key)){
            result[key]=deep(obj[key], map)
        }
    }
    return result;
}
a.reduce((p, x)=> {
    return p.then(()=>{
        return new Promise(r=> {
            setTimeout(()=>r(console.log(x)), 1000)
        })
    })
}, Promise.resolve())

let a = [1,2,3];
function foo (a) {
    a.reduce((p, x)=> {
        p.then(()=> {
            return new Promise(r=> {
                setTimeout(()=> {
                    r(console.log(x))
                }, 1000)
            })
        })
    }, Promise.resolve())
}

function light (time, color) {
    return new Promise(r=> {
        setTimeout(()=> {
            console.log(color)
            r()
        }, time)
    })
}

function process () {
    Promise.resolve().then(()=>{
        return light(1000, 'red')
    }).then(()=> {
        return light
    })
}

function deep (obj, map=new Map()){
    if(typeof obj !=='object') return obj;
    if(map.get(obj)) return map.get(obj);
    let result = Array.isArray(obj)? []:{};
    map.set(obj, result);
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            result[key] = deep(obj[key])
        }
    }
    return result;
}

mySetInterVal(fn, a, b)

function mySetInterVal(fn, a, b){
    this.a = a;
    this.b = b;
    this.time = 0
    this.timer = -1;
    this.start = function() {
        this.timer = setTimeout(()=>{
            fn();
            this.time++;
            start()
        }, this.a + this.time*this.b)
    }
    this.stop = function() {
        clearTimeout(this.timer);
        this.time = 0
    }
}


let a = [1,2,3];
function light (arr) {
    arr.reduce((p,i)=> {
        return p.then(()=> {
            return new Promise(r=>{
                setTimeout(()=>
                {r(console.log(i))},1000)
            })
        })
    },Promise.resolve())
}

function foo (a) {
    a.reduce((p, x)=> {
        p.then(()=> {
            return new Promise(r=> {
                setTimeout(()=> {
                    r(console.log(x))
                }, 1000)
            })
        })
    }, Promise.resolve())
}