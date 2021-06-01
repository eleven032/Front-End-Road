class MyPromise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reaseon = undefined;

        this.resolveArr = [];
        this.rejectArr = [];

        let change = (status, value) => {
            if (this.status !== 'pending') return;
            this.status = status;
            this.value = value;

            let fnArr = status === "resolved" ? this.resolveArr : this.rejectArr;

            fnArr.forEach(item => {
                if (typeof item !== "function") return;
                item(this.value);
            });
        };

        let resolve = result => {
            change("resolved", result)
        }

        let reject = reason => {
            change("rejected", reason);
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(resolveFn, rejectFn) {
        if (typeof resolveFn !== "function") {
            resolveFn = result => {
                return result;
            }
        }

        if (typeof rejectFn !== "function") {
            rejectFn = reason => {
                return MyPromise.reject(reason);
            }
        }

        return new MyPromise((resolve, reject) => {
            this.resolveArr.push(result => {
                try {
                    let x = resolveFn(result);  // 获取执行成功方法返回的结果

                    // 如果x是一个promise实例，则继续调用then方法 ==> then链的实现
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                        return;
                    }

                    // 不是promise实例，直接执行成功的方法
                    resolve(x);
                } catch (err) {
                    reject(err)
                }
            });

            this.rejectArr.push(reason => {
                try {
                    let x = rejectFn(reason);

                    if (x instanceof MyPromise) {
                        x.then(resolve, reject)
                        return;
                    }

                    resolve(x);
                } catch (err) {
                    reject(err)
                }
            });
        })
    }
};