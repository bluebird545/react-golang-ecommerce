package models
type Spec struct {
	Name  string `json:"name" bson:"name"`
	Value string `json:"value" bson:"value"`
	Price     float64 `json:"price" bson:"price"`
}
type VariantModel struct {
	ProductID string `json:"product_id" bson:"product_id"`
	Specs     []*Spec `json:"specs" bson:"specs"`
}

// type Variants struct {
// 	[]
// }