/*const d = document;
const $form = d.querySelector("form");
const $input = d.querySelectorAll(".contact-form[required]");

//VALIDATOR FORM
const formValidations = () => {
  // PRINTER
  $input.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  // LISTENER
  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form[required]")) {
      const $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;

      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      } else {
        return $input.value !== ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });
};

formValidations();*/

//ENVIAR FORMULARIO CON -FETCH- Y FORMSUBMIT

/*const consumeFetch = async () => {
  try {
    const response = await fetch("https://formsubmit.co/dianavodopivec16@gmail.com")
  } catch (error) {
    
  }
}*/