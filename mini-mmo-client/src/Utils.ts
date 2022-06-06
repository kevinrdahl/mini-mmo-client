export interface PlainObject {
    [index:string]: any
}

export function PickRandom<T>(arr:T[]):T|undefined {
    const length = arr.length
    if (length == 0) return undefined
    return arr[Math.floor(Math.random() * length)]
}

export function ArrayRemove<T>(arr:T[], value:T):boolean {
    const index = arr.indexOf(value)
    if (index === -1) return false
    arr.splice(index, 1)
    return true
}

export const GetQueryParam = (function() {
    const paramString = window.location.href.split("?")[1]
    const params:PlainObject = {}
    const query = new URLSearchParams(paramString)
    const keywords:PlainObject = {
        "true":true,
        "false":false,
        "null":null
    }

    for (const [key, value] of query.entries()) {
        const primitive = keywords[key]
        if (primitive !== undefined) {
            params[key] = value
        } else {
            const asNum = Number(value)
            params[key] = !isNaN(asNum) ? asNum : value
        }
    }

    return (key:string, defaultValue?:any) => {
        const value = params[key]
        if (value === undefined) return defaultValue
        return value
    }
})()