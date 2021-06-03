class Category {
    static all = []
    static dropDownOptions = []

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

    addToDropDown() {
        const option = document.createElement("option")
        option.value = this.id
        option.innerText = this.name
        Category.dropDownOptions.push(option)
    }

    render() {
        const h4 = document.createElement("h4")
        const a = document.createElement("a")
        a.id = `category-${this.id}`
        a.innerText = this.name
        a.href = "#"
        a.addEventListener("click", this.renderProducts)
        h4.appendChild(a)
        ul().appendChild(h4)
    }

    renderProducts = (e) => {
        const nextLiSibling = e.target.nextSibling
        if (nextLiSibling) {
            const children = Array.from(e.target.parentNode.children)
            const lis = children.slice(1)
            lis.forEach((li) => li.remove())
        } else {
            this.getProducts().forEach(element => element.render())
        }
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
