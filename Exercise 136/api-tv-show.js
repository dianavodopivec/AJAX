const $shows = document.getElementById("shows-query");
const $template = document.getElementById("show-template").content;
const $fragment = document.createDocumentFragment();

document.addEventListener("keypress", async e => {
    if(e.target.matches("#search")) {
        //console.log(e.key) ((.keyCode nos dirá que número de tecla estamos apretando.))
        if(e.key === "Enter") {
            try {
                if(e.target.value === ""){
                    return
                }
                $shows.innerHTML = `<img class="cargador" src="fade-stagger-squares.svg" alt="Cargando...">`;

                const query = e.target.value.toLowerCase()
                const api = `https://api.tvmaze.com/search/shows?q=${query}`
                const respuesta = await fetch(api);
                const json = await respuesta.json();

                console.log(api, respuesta, json)

                if (!respuesta.ok)
                throw {
                  status: respuesta.statusText,
                  statusText: respuesta.status,
                };

                if(json.length === 0) {
                    $shows.innerHTML = `<h2>No existe el show "${query}"</h2>`
                } else {
                    json.forEach(e => {
                        $template.querySelector("h3").textContent = e.show.name;
                        $template.querySelector("div").innerHTML = e.show.summary ? e.show.summary : "Sin descripción";
                        $template.querySelector("img").src = e.show.image ? e.show.image.medium : "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                        $template.querySelector("img").alt = e.show.name;
                        $template.querySelector("img").style.maxWidth = "100%";
                        $template.querySelector("a").href = e.show.url ? e.show.url : "#"
                        $template.querySelector("a").target = e.show.url ? "_blank": "_self";
                        $template.querySelector("a").textContent = e.show.url ? "Ver más..." : ""

                        const $clone = document.importNode($template, true);
                        $fragment.appendChild($clone)
                    })
                    
                    $shows.innerHTML = ""
                    $shows.appendChild($fragment)
                }

            } catch (error) {
                console.error(error);
                const mensaje = error.statusText || "Algo salió mal 🥲";
                $shows.innerHTML = `<p>Error ${error.status}: ${mensaje}</p>`;
            }
        }
    }
})

