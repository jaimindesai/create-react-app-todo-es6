export const partial = (fn,...agrs) => fn.bind(null,...agrs)

const _pipe = (f,g) => (...args) => g(f(...args))

export const pipe = (...fns) => fns.reduce(_pipe)

