import STRIPE_KEYS from "./stripe-keys.js";
//console.log(STRIPE_KEYS)

const d = document;
const $pizza = d.getElementById("pizza");
const $template = d.getElementById("pizza-template").content;
const $fragment = d.createDocumentFragment();
//Variable para usar en ambas peticiones, sin necesidad de repetir (en este caso, precio y nombre)
const fetchOptions = {
  headers: {
    Authorization: `Bearer ${STRIPE_KEYS.secret}`,
  },
};

let products, prices; //Acá se guardarán los resultados de cada una de las peticiones FETCH.

//Función de formateo de precios
const moneyFormat = (numb) => {
  return `$${numb.slice(0, -2)}.${numb.slice(-2)}`; //El Slice omitirá los dos últimos caracteres del número y a su vez traerá los últimos dos dígitos.
};

Promise.all([
  fetch("https://api.stripe.com/v1/products", fetchOptions),
  fetch("https://api.stripe.com/v1/prices", fetchOptions),
])
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((json) => {
    products = json[0].data;
    prices = json[1].data;
    console.log(products, prices);

    prices.forEach((el) => {
      const productData = products.filter(
        (product) => product.id === el.product
      );
      console.log(productData);
      $template.querySelector(".pizza").setAttribute("data-price", el.id);
      $template.querySelector("img").src = productData[0].images[0];
      $template.querySelector("img").alt = productData[0].name;
      $template.querySelector("figcaption").innerHTML = `
        ${productData[0].name}
        <br>
        ${moneyFormat(el.unit_amount_decimal)} ${el.currency}
        `;
      const $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });
    $pizza.appendChild($fragment);
  })
  .catch((error) => {
    console.error(error);
    const message =
      error.statusText ||
      "Lo sentimos! No puedes conectarte a la API de Stripe 🥲";
    $pizza.innerHTML = `<p>Error ${error.statusText}: ${message}</p>`;
  });

//Delegación de Evento a los elementos internos de la tarjeta (por eso el *).
d.addEventListener("click", (e) => {
  if (e.target.matches(".pizza *")) {
    let priceId = e.target.parentElement.getAttribute("data-price");
    console.log(priceId);
    Stripe(STRIPE_KEYS.public)
      .redirectToCheckout({
        lineItems: [{price: priceId, quantity: 1}], 
        mode: "subscription",
        successUrl: "http://127.0.0.1:5500/Exercise%20130/stripe-success.html",
        cancelUrl: "http://127.0.0.1:5500/Exercise%20130/stripe-cancel.html",
      })
      .then((result) => {
        if (result.error) {
          console.error(result.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

