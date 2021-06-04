class CategoryApi {
    static fetchCategories() {
        fetch('http://localhost:3000/categories')
        .then(resp => resp.json())
        .then(json => json.forEach(catObj => {
            let cat = Category.findOrCreateBy(catObj)
            cat.addToDropDown()
            cat.render()
        }))
        // .then(() => Category.render())
        .catch(this.handleError)
    }

    static handleError(error) {
        flash().innerText = error
        flash().classList.remove("hide")
        setTimeout(() => {
            flash().innerText = ""
            flash().classList.add("hide")
        }, 5000)
    }
}