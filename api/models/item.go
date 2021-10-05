package models
type ProductImage struct {
	URL string `json:"product_image_url" bson:"product_image_url"`
	ALT string `json:"product_image_alt" bson:"product_image_alt"`
}
type Variant struct {
	VariantName string `json:"variant_name" bson:"variant_name"`
	VariantValue string `json:"variant_value" bson:"variant_value"`
}
type Item struct {
	ProductID string `json:"product_id" bson:"product_id"`
	Handle string `json:"handle" bson:"handle"`
	Name string `json:"product_name" bson:"product_name"`
	Collection string `json:"collection" bson:"collection"`
	Tags []string `json:"tags" bson:"tags"`
	Variants []*Variant `json:"variants" bson:"variants"`
	Price float64 `json:"product_price" bson:"product_price"`
	Image *ProductImage `json:"product_image" bson:"product_image"`
	Ingredients []string `json:"product_ingredients,omitempty" bson:"product_ingredients,omitempty"`
	// Instructions string `json:"instructions,omitempty" bson:"instructions,omitempty"`
}