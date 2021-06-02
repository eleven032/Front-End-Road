function myNew(constructor) {
    let obj = {};
    obj._proto_ = constructor.protoType;
    constructor.apply(obj, arguments);
    return obj;
}