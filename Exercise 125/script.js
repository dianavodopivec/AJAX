const d = document;
const $main = d.querySelector("main");
const $files = d.getElementById("files");

//Esta función se ejecutará cada vez que el input reciba un archivo. (NO ME GUSTA ESTA FORMA)
const uploader = (file) => {
    const xhr = new XMLHttpRequest()
    formData = new FormData();

    formData.append("file", file);

    xhr.addEventListener("readystatechange", e => {
        if(xhr.readyState !== 4) return;
        if(xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            console.log(json)
        } else {
            let message = xhr.statusText || "Ocurrió un error"
            console.error(message)
        }
    })
    xhr.open("GET", "assets/uploader.php")
    xhr.setRequestHeader("enc-type", "multipart/form-data")
    xhr.send(formData)
}

//Evento CHANGE al DOCUMENT.
const eventDelegation = () => {
  d.addEventListener("change", (e) => {
    if (e.target === $files) {
      //Por cada FILE que traiga, se ejecutará la función UPLOADER.
      const files = Array.from(e.target.files); //🧠 NOTA: FOR EACH SOLO FUNCIONA CON OBJETOS ITERABLES.
      //🧠 También puedo usar un FOR.
      files.forEach((file) => {
        uploader(file)
      })
    }
  });
};

eventDelegation();
