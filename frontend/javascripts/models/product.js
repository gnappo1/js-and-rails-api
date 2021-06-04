class Product {
    static all = []

    constructor({name, price, description, category, id}) {
        this.name = name
        this.price = price
        this.description = description
        this.category_id = category.id
        this.id = id
        Product.all.push(this)
    }

    static findByName(name) {
        return this.all.find(function(product) { product.name === name})
    }

    static findById(id) {
        return this.all.find(product => product.id === id)
    }

    static findOrCreateBy(productObj) {
        return this.findByName(productObj.name) || new Product(productObj)
    }

    update({name, price, description}) {
        let prod = Product.findById(this.id)
        prod.name = name
        prod.price = price
        prod.description = description
        return prod
    }

    render() {
        // if category is not on the page, then we need to display them all
        //find the category on the page where we need to append the new product
        let catAnchor = document.querySelector(`#category-${this.category_id}`)
        const li = document.createElement("li")
        catAnchor.dataset.catId = this.category_id
        li.innerHTML = `
        <strong class="product-name">${this.name}</strong>
        <span class="product-price">${this.price}</span>
        <span class="product-description">${this.description}</span><br>
        <button class="edit-product" data-id="${this.id}">Edit</button>
        <button class="delete-product" data-id="${this.id}">Delete</button>
        `
        // debugger
        catAnchor.parentNode.appendChild(li)
        document.querySelector(`button.delete-product[data-id='${this.id}']`).addEventListener("click", ProductApi.handleDelete)
        document.querySelector(`button.edit-product[data-id='${this.id}']`).addEventListener("click", this.handleUpdate)
        //build the correct structure for the product
        //append the product
    }

    // static displayForm() {
    //     if (!productForm()) {
    //         list.insertAdjacentHTML('afterend', `
    //             <form id="product-form">
    //                 <h3>Add a new Product:</h3>
    //                 <label for="product-name">Name:</label>
    //                 <input type="text" name="name" id="product-name"><br><br>
    //                 <label for="product-description">Description:</label>
    //                 <input type="text" name="description" id="product-description"><br><br>
    //                 <label for="product-price">Price:</label>
    //                 <input type="number" name="price" id="product-price" min="0" step=".01"><br><br>
    //                 <label for"product-category">Category:</label>
    //                 <select id="category_id">
    //                 </select>
    //                 <input type="submit" value="Create">
    //             </form>
    //         `)
    //         Category.dropDownOptions.forEach(optionTag => productSelectCategory().append(optionTag))
    //         productForm().addEventListener("submit", ProductApi.handleSubmit)
    //     } else {
    //         productForm().remove()
    //     }
    // }

    handleUpdate = (e) => {
        if (e.target.innerText === "Edit") {
            // replace current li with a new one containing inputs and map values
            // Button will now say Update not Edit
            const prodId = e.target.dataset.id
            const name = e.target.parentElement.querySelector(".product-name").innerText
            const price = e.target.parentElement.querySelector(".product-price").innerText
            const description = e.target.parentElement.querySelector(".product-description").innerText
            e.target.parentElement.innerHTML = `
                <label for="product-name">Name:</label>
                <input type="text" name="name" id="product-name" value="${name}"><br>
                <label for="product-description">Description:</label>
                <input type="text" name="description" id="product-description" value="${description}"><br>
                <label for="product-price">Price:</label>
                <input type="number" name="price" id="product-price" min="0" step=".01" value="${price}"><br>
                <button class="update-product" data-id="${prodId}">Update</button>
                <button class="delete-product" data-id="${prodId}">Delete</button>
            `
            document.querySelector(`button.delete-product[data-id='${prodId}']`).addEventListener("click", ProductApi.handleDelete)
            document.querySelector(`button.update-product[data-id='${prodId}']`).addEventListener("click", this.handleUpdate)
    
    
        } else {
            ProductApi.handleFetchUpdate(e)
        }
    }

    replaceElement(li) {
        li.innerHTML = `
            <strong class="product-name">${this.name}</strong>
            <span class="product-price">${this.price}</span>
            <span class="product-description">${this.description}</span><br>
            <button class="edit-product" data-id="${this.id}">Edit</button>
            <button class="delete-product" data-id="${this.id}">Delete</button>
        `
        document.querySelector(`button.delete-product[data-id='${this.id}']`).addEventListener("click", ProductApi.handleDelete)
        document.querySelector(`button.edit-product[data-id='${this.id}']`).addEventListener("click", this.handleUpdate)
    
    }
}