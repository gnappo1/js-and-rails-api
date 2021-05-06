const buttonDiv = () => document.getElementById("button-control")
const button = () => document.getElementById("button")
const ulDiv = () => document.getElementById("list")
const ul = () => document.getElementById("products-list")

document.addEventListener("DOMContentLoaded", () => {
    button().addEventListener("click", handleClick)
})

const handleClick = () => {
    fetch('http://localhost:3000/products')
    .then(resp => resp.json())
    .then(json => renderProducts(json))
    .catch(handleError)
}

const renderProducts = (products) => {
    products.forEach(element => {
        const li = document.createElement("li")
        li.innerHTML = `
            <h2 class="product-name">${element.name}</h2>
            <h4 class="product-price">${element.price}</h4>
            <h4 class="product-category-name">${element.category.name}</h4>
            <p class="product-description">${element.description}</p>
        `
        ul().appendChild(li)
    });
}

const handleError = (error) => {
    console.log(error)
}