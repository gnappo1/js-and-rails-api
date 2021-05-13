class Product < ApplicationRecord
  belongs_to :category
  validates :description, presence: true
end
