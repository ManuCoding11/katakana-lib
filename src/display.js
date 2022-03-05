function displaySign () {
    let choices = []

    for (let e of field_chars.children) {
        if (e.nodeName == "INPUT" && e.type == "checkbox" && e.checked) {
            choices.push(e.value)
        }
    }

    generateKana(input_amount.value, choices).forEach(s => displaySignRaw(s))
}

function displaySignRaw (sign) {
    let div = document.createElement('div')
    let input = document.createElement('input')
    let button = document.createElement('button')

    div.className = "divOut"
    input.className = "inputOut"
    button.className = "buttonOut"

    button.addEventListener('click', () => {
        if (!input.value || input.value == "" || input.isSet) return

        input.readOnly = true
        input.isSet = true

        if (input.value == sign.resolved) {
            input.style.color = '#00b000'
            input.style.backgroundColor = '#d0d0d0'
        }
        else {
            input.value = sign.resolved
            input.style.color = '#dd0000'
            input.style.backgroundColor = '#d0d0d0'
        }
    })
    
    outBase.appendChild(div)
    div.appendChild(document.createTextNode(sign.kana ?? sign ?? ""))
    div.appendChild(input)
    div.appendChild(button)
}

function clearOut () {
    while (outBase.firstChild) outBase.removeChild(outBase.lastChild)
}
