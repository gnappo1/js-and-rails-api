class CategoriesController < ApplicationController
  # before_action :set_category, only: [:show, :update, :destroy]

  def index
    categories = Category.all
    render json: categories #, only: [:id, :name], include: {products: {except: [:category_id, :created_at, :updated_at, ]}}
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def create
    category = Category.new(category_params)

    if category.save
      render json: category, status: :created, location: category
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  def update
    category = Category.find(params[:id])
    if category.update(category_params)
      render json: category
    else
      render json: category.errors, status: :unprocessable_entity
    end
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      category = Category.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:name)
    end
end
