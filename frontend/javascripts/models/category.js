class Category {
    static all = []

    constructor({name, id, products = []}){
        this.name = name
        this.id = id
        // this.products = products
        Category.all.push(this)
    }

    static getAll() {
        return this.all
    }

    static findByName(name) {
       return this.all.find(function(category) { category.name === name})
    }

    static findById(id) {
        return this.all.find(category => category.id === id)
    }

    static findOrCreateBy(categoryObj) {
        return this.findByName(categoryObj.name) || new Category(categoryObj)
    }

    getProducts() {
        return Product.all.filter(product => this.id === product.category_id )
    }

    render() {
        // ul().innerHTML += "<h1 id='categories-header'>Categories</h1>"
        // this.all.forEach(cat => this.renderCategory(cat))
        const h4 = document.createElement("h4")
        const a = document.createElement("a")
        a.id = `category-${this.id}`
        a.innerText = this.name
        a.href = "#"
        a.addEventListener("click", (e) => renderProducts(e, this))
        h4.appendChild(a)
        ul().appendChild(h4)
    }

    // static renderCategory(category) {
    //     const h4 = document.createElement("h4")
    //     const a = document.createElement("a")
    //     a.id = `category-${category.id}`
    //     a.innerText = category.name
    //     a.href = "#"
    //     a.addEventListener("click", (e) => renderProducts(e, category))
    //     h4.appendChild(a)
    //     ul().appendChild(h4)
    // }

    renderProducts(cat) {
        return cat
    }
}
