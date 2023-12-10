const d = document;
const $main = d.querySelector("main");

const getHTML = async (url) => {
    try {
        const response = await fetch(url)
        if(!response.ok){
            throw{
                status: response.status
            }
        }
        const data = await response.text()
        $main.innerHTML = data
    } catch (error) {
        console.error(error)
    }
}

d.addEventListener("DOMContentLoaded", e =>{
    d.addEventListener("click", e =>{
        e.preventDefault()
        if(e.target.matches("a")){
            getHTML(e.target.href)
        }
    })
})


getHTML("assets/home.html")

