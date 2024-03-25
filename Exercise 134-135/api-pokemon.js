const $header = document.querySelector("header");
const $main = document.querySelector("main");
const $links = document.querySelector(".links");

const pokeApi = "https://pokeapi.co/api/v2/pokemon/";

const consumePokemonApi = async (url) => {
    try {
        $header.innerHTML = `<img class="cargador" src="bouncing-circles.svg" alt="Cargando...">`;
        let respuesta = await fetch(url),
          json = await respuesta.json(),
          $template = "",
          $prevLink,
          $nextLink;
        //console.log(json);
    
        //Manipulación de errores
        if (!respuesta.ok)
          throw {
            status: respuesta.statusText,
            statusText: respuesta.status,
          };
        //Utilización de un for "bloqueante", ya que hasta que no termine todo el flujo no pasará al siguiente.
        for (let i = 0; i < json.results.length; i++) 
        //ForEach para obtener la información de cada API.
        try {
          let respuesta =  await fetch(json.results[i].url);
          pokemon = await respuesta.json();
          console.log(respuesta, pokemon)

          if (!respuesta.ok)
          throw {
            status: respuesta.statusText,
            statusText: respuesta.status,
          };
          
        } catch (error) {
          console.error(error);
          const mensaje = error.statusText || "Algo salió mal 🥲"
          $header.innerHTML = `<p>Error ${error.status}: ${mensaje}</p>`
        }

    } catch (error) {
        console.error(error);
        const mensaje = error.statusText || "Algo salió mal 🥲"
        $header.innerHTML = `<p>Error ${error.status}: ${mensaje}</p>`
    }    
};

document.addEventListener("DOMContentLoaded", (e) => {
  consumePokemonApi(pokeApi);
});
