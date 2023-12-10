const d = document;
const $main = d.querySelector("main");
const $header = d.querySelector("header");

const recyclableConstructor = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw {
        message: response.statusText || "Something went wrong!",
        status: response.status,
      };
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const printHome = () => {
  d.addEventListener("DOMContentLoaded", async (e) => {
    try {
      const homeURL = "assets/home.html";
      const homeHTML = await recyclableConstructor(homeURL);
      $main.innerHTML = homeHTML;
    } catch (error) {
      console.error(error);
    }
  });
};

const printAnyOtherPage = () => {
  d.addEventListener("click", async (e) => {
    if (e.target.matches("a")) {
      e.preventDefault();
      const newPage = await recyclableConstructor(e.target.href);
      $main.innerHTML = newPage;
    }
  });
};

const printNav = () => {
  d.addEventListener("DOMContentLoaded", async (e) => {
    try {
      const navURL = "assets/nav.html";
      const navHTML = await recyclableConstructor(navURL);
      $header.innerHTML = navHTML;
    } catch (error) {
      console.error(error);
    }
  });
};

printNav();
printHome();
printAnyOtherPage();
