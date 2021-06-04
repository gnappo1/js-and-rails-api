document.addEventListener("DOMContentLoaded", () => {
    CategoryApi.fetchCategories()
    ProductApi.fetchProducts()
    productForm().addEventListener("submit", ProductApi.handleSubmit)
})