function read(id) {
    return document.getElementById(id).value;
}
let id;
async function translate() {
    try {
        const query = read("input-text");
        const inpLang = read("input-lang");
        const outLang = read("out-lang");
        const res = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: query,
                source: inpLang,
                target: outLang,
                format: "text",
                // api_key: ""
            }),
            headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();
        return data;
    } catch {
        console.log(Error);
    }
}

async function main() {
    const data = await translate();
    if (data === undefined) {
        return false;
    }
    append(data);
}

function append(data) {
    document.getElementById("output-value").innerHTML = null;
    const p = document.createElement("p");
    p.innerText = data.translatedText;
    document.getElementById("output-value").append(p);
}

function debounce(func, delay) {
    if (id) {
        clearTimeout(id);
    }
    id = setTimeout(function () {
        func();
    }, delay);
}