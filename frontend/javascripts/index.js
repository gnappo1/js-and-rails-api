const buttonDiv = () => document.getElementById("button-control")
const buttonShow = () => document.getElementById("button-show")
const buttonNew = () => document.getElementById("button-new")
const ulDiv = () => document.getElementById("list")
const ul = () => document.getElementById("categories-list")
const productForm = () => document.getElementById("product-form")
const formName = () => document.querySelector("#product-name")
const formDescription = () => document.querySelector("#product-description")
const formPrice = () => document.querySelector("#product-price")
const formCategory = () => document.querySelector("#category_id")
document.addEventListener("DOMContentLoaded", () => {
    buttonShow().addEventListener("click", handleClick)
    buttonNew().addEventListener("click", displayForm)
})

const handleClick = (e) => {
    if (ul().children.length < 1) {
        fetch('http://localhost:3000/categories')
        .then(resp => resp.json())
        .then(json => renderCategories(json))
        .catch(handleError)
    } else {
        ul().innerHTML = ""
    }
}

const displayForm = () => {
    if (!productForm()) {
        fetchCategoriesForSelect()
        list.insertAdjacentHTML('afterend', `
        <form id="product-form">
            <h3>Add a new Product:</h3>
            <label for="product-name">Name:</label>
            <input type="text" name="name" id="product-name"><br><br>
            <label for="product-description">Description:</label>
            <input type="text" name="description" id="product-description"><br><br>
            <label for="product-price">Price:</label>
            <input type="number" name="price" id="product-price" min="0" step=".01"><br><br>
            <label for"product-category">Category:</label>
            <select id="category_id">
            </select>
            <input type="submit" value="Create">
        </form>
        `)
        productForm().addEventListener("submit", handleSubmit)
    } else {
        productForm().remove()
    }
}

const fetchCategoriesForSelect = () => {
    fetch('http://localhost:3000/categories')
            .then(resp => resp.json())
            .then(json => json.map((catObj) => `<option value="${catObj.id}">${catObj.name}</option>`))
            .then(collection => document.querySelector("select#category_id").innerHTML = collection.join(" "))
}

const renderCategories = (categories) => {
    ul().innerHTML += "<h1 id='categories-header'>Categories</h1>"
    categories.forEach(element => renderCategory(element));
}


const renderCategory = (category) => {
    const h4 = document.createElement("h4")
    const a = document.createElement("a")
    h4.dataset.categoryId = category.id
    a.id = `category-${category.id}`
    a.innerText = category.name
    a.href = "#"
    a.alt = `${category.name}`
    a.addEventListener("click", (e) => renderProducts(e, category))
    h4.appendChild(a)
    ul().appendChild(h4)
}

const renderProducts = (e, category) => {
    const nextLiSibling = e.target.nextSibling
    if (nextLiSibling) {
        const children = Array.from(e.target.parentNode.children)
        const lis = children.slice(1)
        lis.forEach((li) => li.remove())
    } else {
        category.products.forEach(element => renderProduct(element, category.id));
    }
}
const renderProduct = (product, catId) => {
    const a = document.getElementById(`category-${catId}`)
    const li = document.createElement("li")
    li.dataset.productid = product.id
    li.innerHTML = `
        <strong class="product-name">${product.name}</strong>
        <span class="product-price">${product.price}</span>
        <span class="product-description">${product.description}</span><br>
        <button class="edit-product" data-id="${product.id}">Edit</button>
        <button class="delete-product" data-id="${product.id}">Delete</button>
    `
    a.parentNode.appendChild(li)
    document.querySelectorAll(".edit-product").forEach(btn => btn.addEventListener("click", handleUpdate))
}

const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(productForm())
    formData.append("category_id", formCategory().value)

    const data = {
        name: formName().value,
        description: formDescription().value,
        price: formPrice().value,
        category_id: formCategory().value
    }
    fetch("http://localhost:3000/products", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => {
        ul().children.length < 1 ? handleClick() : null
        renderProduct(json, json.category.id)
        productForm().clear()
    })
}

const handleUpdate = (e) => {
    if (e.target.innerText === "Edit") {
        const prodId = e.target.parentElement.dataset.productId
        const name = e.target.parentElement.querySelector(".product-name").innerText 
        const price = e.target.parentElement.querySelector(".product-price").innerText 
        const description = e.target.parentElement.querySelector(".product-description").innerText 
        e.target.parentNode.innerHTML = `
            <label for="product-name">Name:</label>
            <input type="text" name="name" id="product-name" value="${name}"><br>
            <label for="product-description">Description:</label>
            <input type="text" name="description" id="product-description" value="${description}"><br>
            <label for="product-price">Price:</label>
            <input type="number" name="price" id="product-price" min="0" step=".01" value="${price}"><br>
            <button class="edit-product" data-id="${e.target.dataset.id}">Update</button>
            <button class="delete-product" data-id="${e.target.dataset.id}">Delete</button>
            `
        document.querySelector(`button[data-id='${prodId}']`).addEventListener("click", handleUpdate)
    } else {

    }
}


const handleError = (error) => {
    console.log(error)
}