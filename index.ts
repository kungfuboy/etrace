const style = "background-color: #a22041; color: #fff;padding:3px;box-sizing: border-box;border-radius: 3px;"

const tracing = () => {
    var orig = Error.prepareStackTrace
    Error.prepareStackTrace = function (_, stack) {
        return stack
    }
    var err = new Error()
    Error.captureStackTrace(err, tracing)
    var stack = err.stack
    Error.prepareStackTrace = orig
    return stack
}

const handler = {
    get: function (target, key, receiver) {
        // console.log("=>", key);
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
        // console.log(`setting ${key}!`);
        console.trace(
            `%c ${key} call stack %c`,
            style,
            ""
        )
        return Reflect.set(target, key, value, receiver)
    },
}

const trace = (data) => {
    // * 判断data是否为对象
    // TODO 添加数组等其他有浅拷贝隐患的数据类型的支持
    const proxy = new Proxy(data, handler)
    return proxy
}

export default trace
