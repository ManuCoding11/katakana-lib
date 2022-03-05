function generateKana (count, ...only) {
    if (!Number.isInteger(count) && count <= 0) return []

    let genMatrix = {},
        retval = []

    if (only.length > 0 && only.flat().some(e => Object.keys(signs).includes(e)))
        only.flat()
            .filter(e => Object.keys(signs).includes(e))
            .forEach(e => genMatrix[e] = signs[e])
    else genMatrix = signs

    for (let i = 0; i < count; ++i) {
        let key = Util.randomKey(genMatrix),
            // map indices of all array entries except empty strings
            except = signs[key].map((v, i) => v == "" ? i : null).filter(v => v != null),
            num = Util.random(0, 4, except)

        retval.push({
            kana: genMatrix[key][num],
            char: key,
            vowel: _meta.mapping_rev[num],
            resolved: replaceException(key + _meta.mapping_rev[num])
        })
    }

    return retval
}

function generateKanaNoInfo (count, ...only) {
    return generateKana(count, ...only).map(v => v.kana)
}
