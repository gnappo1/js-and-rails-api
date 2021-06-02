class CategoryApi {
    static fetchCategories() {
        fetch('http://localhost:3000/categories')
        .then(resp => resp.json())
        .then(json => json.forEach(catObj => {
            let cat = Category.findOrCreateBy(catObj)
            cat.render()
        }))
        // .then(() => Category.render())
        .catch(handleError)
    }

    static handleError(error) {
        console.log(error)
    }
}