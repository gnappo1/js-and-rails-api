class ProductApi {
    
    // constructor(baseUrl) {
    //     this.baseUrl = `${baseUrl}/products`
    // }
    static baseUrl = `${baseUrl}/products`

    static fetchProducts() {
        fetch(this.baseUrl)
        .then(resp => resp.json())
        .then(json => json.forEach(prodObj => {
            Product.findOrCreateBy(prodObj)
            // product.render()
        }))
        // .then(() => Category.render())
        .catch(handleError)
    }

    static handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            name: productName().value,
            description: productDescription().value,
            price: productPrice().value,
            category_id: productSelectCategory().value
        }
        fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(json => {
            debugger
            let prod = new Product(json)
            prod.render()
        })
    }
}