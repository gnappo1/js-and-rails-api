class CategorySerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :products, except: [:created_at, :updated_at]

  def products
    self.object.products.map do |p|
      {
        name: p.name,
        price: p.price,
        description: p.description
      }
    end
  end
end
