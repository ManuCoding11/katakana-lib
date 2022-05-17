"use strict"

const signs =
{
    "": ["ア","イ","ウ","エ","オ"],
    "b": ["バ","ビ","ブ","ベ","ボ"],
    "d": ["ダ","ヂ","ヅ","デ","ド"],
    "g": ["ガ","ギ","グ","ゲ","ゴ"],
    "h": ["ハ","ヒ","フ","ヘ","ホ"],
    "k": ["カ","キ","ク","ケ","コ"],
    "m": ["マ","ミ","ム","メ","モ"],
    "n": ["ナ","ニ","ヌ","ネ","ノ"],
    "p": ["パ","ピ","プ","ペ","ポ"],
    "r": ["ラ","リ","ル","レ","ロ"],
    "s": ["サ","シ","ス","セ","ソ"],
    "t": ["タ","チ","ツ","テ","ト"],
    "w": ["ワ","","","","ヲ"],
    "y": ["ヤ","","ユ","","ヨ"],
    "z": ["ザ","ジ","ズ","ゼ","ゾ"]
}

const _meta =
{
    digraphs: {
        a: "ャ",
        o: "ョ",
        u: "ュ"
    },
    special: {
        n: "ン"
    },
    mapping: {
        a: 0,
        e: 3,
        i: 1,
        o: 4,
        u: 2
    },
    mapping_rev: {
        0: "a",
        1: "i",
        2: "u",
        3: "e",
        4: "o"
    },
    exceptions: {
        tsu: "tu",
        chi: "ti",
        shi: "si",
        fu: "hu",
        ji: "zi"
    },
    exceptions_rev: {
        tu: "tsu",
        ti: "chi",
        si: "shi",
        hu: "fu",
        zi: "ji"
    }
}

/**
 * 
 * @param {String} char
 * @param {String} vowel a, o, u
 * 
 * @returns {String}
 */
function digraphOfRaw (char, vowel) {
    if (Object.keys(signs).includes(char) && Object.keys(_meta.digraphs).includes(vowel)) {
        return signs[char][_meta.mapping["i"]] + _meta.digraphs[vowel]
    }
}

function replaceException (sign) {
    return _meta.exceptions_rev[sign] ?? sign
}

/**
 * 
 * @param {String} char
 * @param {String} vowel
 * 
 * @returns {String}
 */
function signOfRaw (char, vowel) {
    if (Object.keys(signs).includes(char) && Object.keys(_meta.mapping).includes(vowel)) {
        return signs[char][_meta.mapping[vowel]]
    }
    else if (Object.keys(_meta.special).includes(char) && vowel == "") {
        return _meta.special[char];
    }
    else if (Object.keys(_meta.special).includes(vowel) && char == "") {
        return _meta.special[vowel];
    }
}

function signOf (str) {
    if (str && str.length > 0 && str.length < 4) {
        str = tryReplace(str.toLowerCase())
        
        if (str.length === 1) {
            return signOfRaw("", str[0])
        }
        else if (str.length === 2) {
            return signOfRaw(str[0], str[1])
        }
        else if (str.length === 3) {
            if (str[1] === "y")
                return digraphOfRaw(str[0], str[2])
        }
    }
}
