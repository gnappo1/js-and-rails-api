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

    render() {
        // if category is not on the page, then we need to display them all
        if (ul().children.length < 1) {
            handleClick() 
        } else {
            //find the category on the page where we need to append the new product
            let catAnchor = document.querySelector(`category-${this.category_id}`)
            const li = document.createElement("li")
            //issue with catAnchor
            //place debugger here
            catAnchor.dataset.catId = catId
            li.innerHTML = `
                <strong class="product-name">${this.name}</strong>
                <span class="product-price">${this.price}</span>
                <span class="product-description">${this.description}</span><br>
                <button class="edit-product" data-id="${this.id}">Edit</button>
                <button class="delete-product" data-id="${this.id}">Delete</button>
            `
            catAnchor.parentNode.appendChild(li)
            document.querySelector(`button.delete-product[data-id='${this.id}']`).addEventListener("click", handleDelete)
            document.querySelector(`button.edit-product[data-id='${this.id}']`).addEventListener("click", handleUpdate)

        }
        //build the correct structure for the product
        //append the product
    }
}