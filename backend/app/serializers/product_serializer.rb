class ProductSerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  attributes :name, :price, :description, :category
  
  belongs_to :category, except: [:created_at, :updated_at]
end
