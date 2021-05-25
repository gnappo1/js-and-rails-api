class CategoryApi {
    static fetchCategories() {
        fetch('http://localhost:3000/categories')
        .then(resp => resp.json())
        .then(json => json.forEach(catObj => Category.findOrCreateBy(catObj)))
        .catch(handleError)
    }

    static handleError(error) {
        console.log(error)
    }
}