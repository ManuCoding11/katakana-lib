class Util {
    /**
     * 
     * @param {Object} obj 
     * @returns {string} key name
     */
    static randomKey (obj) {
        if (!(obj && Object.keys(obj).length > 0)) return
    
        let keys = Object.keys(obj)
        let rand = Math.floor(Math.random() * keys.length)
    
        return keys[rand]
    }

    /**
     * 
     * @param {Number} min minimum range
     * @param {Number} max maximum range
     * @param {...Number} except numbers to skip
     */
    static random (min, max, ...except) {
        min = Number(min)
        max = Number(max)

        let diff = max - min + 1
        if (except.length >= diff) return NaN

        let rand
        do {
            rand = Math.floor(Math.random() * (max - min + 1)) + min
        }
        while (except.flat().includes(rand))
        return rand
    }

    /**
     * 
     * @param {Function} algorithm callback function to run
     * @param {any} args function arguments
     */
    static testRandom (algorithm, ...args) {
        let counter = {}

        for (let i = 0; i < 500; ++i) {
            let res = algorithm(...args)
            if (counter[res] === undefined)
                counter[res] = 1
            else counter[res]++
        }

        return counter
    }

    /**
     * 
     * @param  {...any} str
     * @returns {string}
     */
    static concatSafe (...str) {
        str.filter(s => s !== undefined && s !== null).join("")
    }
}
