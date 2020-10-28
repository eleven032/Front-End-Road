const throttle = (func, wait = 500) => {
    let flag = true;
    return function (...args) {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            func.apply(this, args);
            flag = true;
        }, wait);
    }
}
