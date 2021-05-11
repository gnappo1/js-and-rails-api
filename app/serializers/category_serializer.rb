class CategorySerializer < ActiveModel::Serializer
  # include FastJsonapi::ObjectSerializer
  attributes :name, :id
  has_many :products, except: [:created_at, :updated_at]

  def products
    self.object.products.map do |p|
      {
        name: p.name,
        id: p.id,
        price: p.price,
        description: p.description
      }
    end
  end
end
