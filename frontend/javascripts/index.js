document.addEventListener("DOMContentLoaded", () => {
    buttonShow().addEventListener("click", handleClick)
    buttonNew().addEventListener("click", Product.displayForm)
    ProductApi.fetchProducts()
})

const handleClick = (e) => {
    if (ul().children.length < 1) {
     CategoryApi.fetchCategories()
    } else {
        ul().innerHTML = ""
    }
}