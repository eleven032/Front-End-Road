var obj1 = {
    a: 1,
    c: 2,
    b: { d: 1 }
}

var obj2 = JSON.parse(JSON.stringify(a));

const deepCopy = (obj) => {
    let copy = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    copy[key] = deepCopy(obj[key]);
                } else {
                    copy[key] = obj[key];
                }
            }
        }
    }
    return copy;
}