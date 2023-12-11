const d = document;
const $main = d.querySelector("main");
const $header = d.querySelector("header");
const $footer = d.querySelector("footer");

const recyclableHTML = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw {
        message:
          response.statusText ||
          "Joder tio, parece que tienes un maldito error!",
        status: response.status,
      };
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const anyPage = () => {
    d.addEventListener("click", async e => {
        if(e.target.matches("a")){
            e.preventDefault()
            const anyPageURL = e.target.href
            const anyPageHTML = await recyclableHTML(anyPageURL)
            $main.innerHTML = anyPageHTML
            console.dir(e.target)
        }
    })
}

const printNav = () => {
  d.addEventListener("DOMContentLoaded", async (e) => {
    try {
      const navURL = "assets/nav.html";
      const navHTML = await recyclableHTML(navURL);
      $header.innerHTML = navHTML;
    } catch (error) {
      console.error(error);
    }
  });
};

const printHome = () => {
  d.addEventListener("DOMContentLoaded", async (e) => {
    try {
      const homeURL = "assets/home.html";
      const homeHTML = await recyclableHTML(homeURL);
      $main.innerHTML = homeHTML;
    } catch (error) {
      console.error(error);
    }
  });
};

const printFooter = () => {
  d.addEventListener("DOMContentLoaded", async (e) => {
    try {
      const footerURL = "assets/footer.html";
      const footerHTML = await recyclableHTML(footerURL);
      $footer.innerHTML = footerHTML;
    } catch (error) {
      console.error(error);
    }
  });
};

anyPage()
printNav();
printHome()
printFooter();
