import { countriesobj } from "./countries.js";
const countriesName = countriesobj;
let translateBtn = document.getElementById("translate-btn");
let fromtxt = document.querySelector("#translate-from")
let translatedTextShow = document.querySelector(".translate-to");
let exchange = document.querySelector(".fa-exchange");
let copyFrom = document.querySelector("#copy-from");
let copyTo = document.querySelector("#copy-to");


let select = document.querySelectorAll("select");


select.forEach(
    (element, id) => {
        for (const countries in countriesName) {
            let selected = id == 0 ? countries == "en-GB" ? "selected" : " " : countries == "ur-PK" ? "selected" : " ";
            let options = `<option value="${countries}" ${selected}>${countriesName[countries]}</option>`
            element.insertAdjacentHTML("beforeend", options)
        }
    });


exchange.addEventListener("click", () => {
    let temporaryStoredFromText = fromtxt.value;
    fromtxt.value = translatedTextShow.value;
    translatedTextShow.value = temporaryStoredFromText;
    let temporaryFromLang = select[0].value;
    select[0].value = select[1].value;
    select[1].value = temporaryFromLang;

})

translateBtn.addEventListener("click", () => {
    let from = select[0].value;
    let to = select[1].value;
    translatedTextShow.setAttribute("placeholder", "Translating...")
    fetch(`https://api.mymemory.translated.net/get?q=${fromtxt.value}!&langpair=${from}|${to}`).then(res => res.json()).then(result => {
        translatedTextShow.value = result.responseData.translatedText;
    })
})

copyFrom.addEventListener("click", () => {
    navigator.clipboard.writeText(fromtxt.value);

})

copyTo.addEventListener("click", () => {
    navigator.clipboard.writeText(translatedTextShow.value);

})