const buttonDiv = () => document.getElementById("button-control")
const buttonShow = () => document.getElementById("button-show")
const buttonNew = () => document.getElementById("button-new")
const ulDiv = () => document.getElementById("list")
const ul = () => document.getElementById("categories-list")
const productForm = () => document.getElementById("product-form")
const productName = () => document.getElementById("product-name")
const productPrice = () => document.getElementById("product-price")
const productDescription = () => document.getElementById("product-description")
const productSelectCategory = () => document.getElementById("category_id")

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
    a.id = `category-${category.id}`
    a.innerText = category.name
    a.href = "#"
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
    // debugger
    const a = document.getElementById(`category-${catId}`)
    const li = document.createElement("li")
    a.dataset.catId = catId
    li.innerHTML = `
        <strong class="product-name">${product.name}</strong>
        <span class="product-price">${product.price}</span>
        <span class="product-description">${product.description}</span><br>
        <button class="edit-product" data-id="${product.id}">Edit</button>
        <button class="delete-product" data-id="${product.id}">Delete</button>
    `
    a.parentNode.appendChild(li)
    document.querySelector(`button.delete-product[data-id='${product.id}']`).addEventListener("click", handleDelete)
    document.querySelector(`button.edit-product[data-id='${product.id}']`).addEventListener("click", handleUpdate)
}

const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
        name: productName().value,
        description: productDescription().value,
        price: productPrice().value,
        category_id: productSelectCategory().value
    }

    fetch("http://localhost:3000/products", {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(json => handleCreateProduct(json))
}

const handleDelete = (e) => {
    fetch(`http://localhost:3000/products/${e.target.dataset.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(json => {
        e.target.parentNode.remove()
        alert(json.message)
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
        document.querySelector(`button.edit-product[data-id='${e.target.dataset.id}']`).addEventListener("click", handleUpdate)
    } else {
        handleUpdateProduct(e)
    }
}

const handleUpdateProduct = (e) => {
    const prodId = e.target.dataset.id
    const name = e.target.parentElement.querySelector("#product-name").value
    const price = e.target.parentElement.querySelector("#product-price").value
    const description = e.target.parentElement.querySelector("#product-description").value
    const data = {
        id: prodId,
        name: name, 
        price: price,
        description: description
    }
        fetch(`http://localhost:3000/products/${prodId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => replaceElement(json, e.target.parentNode))
        .catch(err => alert(err))
   
}

const replaceElement = (product, li) => {
    li.innerHTML = `
        <strong class="product-name">${product.name}</strong>
        <span class="product-price">${product.price}</span>
        <span class="product-description">${product.description}</span><br>
        <button class="edit-product" data-id="${product.id}">Edit</button>
        <button class="delete-product" data-id="${product.id}">Delete</button>
    `
    document.querySelector(`button.delete-product[data-id='${product.id}']`).addEventListener("click", handleDelete)
    document.querySelector(`button.edit-product[data-id='${product.id}']`).addEventListener("click", handleUpdate)
}

const handleCreateProduct = (product) => {
    //make sure the categories are on the page
    //make sure the new product will end up on the page
    ul().children.length < 1 ? handleClick() : renderProduct(product, product.category.id)
    productForm().reset()
}

const handleError = (error) => {
    console.log(error)
} 