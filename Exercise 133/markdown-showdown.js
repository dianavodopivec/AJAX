const $main = document.querySelector("main");

const markDownArchive = () => {
    fetch("markdown-testing.md")
    .then(respuesta => respuesta.ok ? respuesta.text() : Promise.reject(respuesta))
    .then(text => {
        console.log(text)
        $main.innerHTML = new showdown.Converter().makeHtml(text)
    })
    .catch(error => {
        console.error(error);
        const mensaje = error.statusText || "Algo salió mal 🥲"
        $main.innerHTML = `Error ${error.status}: ${mensaje}`
    })
}

markDownArchive()