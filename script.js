const html = document.querySelector("html");
const textArea = document.querySelector(".js-textarea");
const display = document.querySelector(".js-display-text");

const buttonEncrypt = document.querySelector(".js-encrypt");
buttonEncrypt.addEventListener("click", checkLowerCase);

const buttonDescrypt = document.querySelector(".js-descrypt");
buttonDescrypt.addEventListener("click", descryptText);

const buttonCopy = document.querySelector(".js-btn-copy");
buttonCopy.addEventListener("click", copyText);

const buttonClear = document.querySelector(".js-btn-clear");
buttonClear.addEventListener("click", clearText);

const message = document.querySelector(".asideMensagem")?.cloneNode(true);

const alertContainer = document.getElementById('alertContainer');
const alertClose = document.getElementById('alertClose');

let alertTimeout;
textArea.focus();


function displayText(text) {
    display.classList.add("is-show-text");
    display.textContent = text;
}

function checkLowerCase() {
    const regex = /^([a-z\s])+$/;
    const lowerCase = regex.test(textArea.value);

    if (lowerCase) {
        encryptText();
    } else {
        showAlert("Apenas letras minúsculas, sem acento.");
    }
}

function encrypt(match) {
    const keysOfEncrypt = {
        "a": "ai",
        "e": "enter",
        "i": "imes",
        "o": "ober",
        "u": "ufat",
    }
    return keysOfEncrypt[match];
}

function encryptText() {
    const text = textArea.value;

    if(text != "") {

        const encrypted = text.replace(/[aeiou]/g, encrypt);
        displayText(encrypted);
        scrollPage(html.scrollHeight);
    }
}

function descrypt(match) {
    const keysOfDescrypt = {
        "ai": "a",
        "enter": "e",
        "imes": "i",
        "ober": "o",
        "ufat": "u",
    }
    
    return keysOfDescrypt[match];
}

function descryptText() {
    const text = textArea.value;

    if (text !== "") {
        const descrypted = text.replace(/ai|enter|imes|ober|ufat/g, descrypt);
        displayText(descrypted);
        scrollPage(html.scrollHeight);
        showDescryptAlert(); 
    }
}

function showAlert(message) {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertContainer.style.display = 'flex'; 

    // Limpando o timeout anterior
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }
    // Define um timeout para esconder o alerta após 1 segundo
    alertTimeout = setTimeout(hideAlert, 1000);
}

// Função para esconder o alerta
function hideAlert() {
    alertContainer.style.display = 'none'; // Esconde o alerta
}

function clearText() {
    textArea.value = "";
    if (!display.contains(document.querySelector(".aside__message"))) {
        display.textContent = "";
        display.classList.remove("is-show-text");
    }
}

// Função copyText modificada
function copyText() {
    const image = document.querySelector(".aside__image");

    if (!display.contains(image)) {
        navigator.clipboard.writeText(display.textContent).then(() => {
            showAlert("Texto Copiado!");
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}
