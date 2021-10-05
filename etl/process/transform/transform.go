package transform

import (
	"fmt"
	// "reflect"
	"strconv"
	"strings"

	model "mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/models"
)

// func TransformProducts(line interface{}, v interface{}) interface{} {
func TransformProducts(line []string, v interface{}) model.Item {
	// val := reflect.ValueOf(v)
	// structType := val.Type()
	// tableName := structType.Name()
	// fmt.Println("ValueOf(v):", val)
	// fmt.Println("val.Type():", structType)
	// fmt.Println("structType.Name():", tableName)
	
	// for i := 0; i < structType.NumField(); i++ {
	// 	field := structType.Field(i)
	// 	fieldName := field.Name
	// 	fmt.Println(fieldName)
	// }
	var err error
	// var newProduct = &model.Item{}
	var newProduct model.Item
	newProduct.ProductID = line[0]
	newProduct.Handle = line[1]
	newProduct.Name = line[2]
	newProduct.Collection = line[3]
	// tags
	tags := strings.Fields(line[4])
	newProduct.Tags = tags
	// variant of item
	var variants []*model.Variant
	var variant = &model.Variant{line[5], line[6]}
	variants = append(variants, variant)
	newProduct.Variants = variants
	newProduct.Price, err = strconv.ParseFloat(line[7], 64)
	if err != nil {
		fmt.Println("Error converting price to float")
		// break
	}
	// image details
	var image = &model.ProductImage{line[8], line[9]}
	newProduct.Image = image
	// construct ingredients array
	ingredients := strings.Fields(line[10])
	newProduct.Ingredients = ingredients
	return newProduct
}

func TransformVariants(line []string) interface{} {
	var err error
	// var newVariant = &model.VariantModel{}
	var newVariant model.VariantModel
	newVariant.ProductID = line[0]

	// var specsArray = []&model.Spec{}
	// var specsArray = []interface{}{}
	spec := &model.Spec{Name: line[1], Value: line[2]}
	spec.Price, err = strconv.ParseFloat(line[3], 64)
	if err != nil {
		fmt.Println("Error converting price to float")
		// break
	}
	// specsArray = append(specsArray, spec)

	// newVariant.Specs = specsArray
	newVariant.Specs = append(newVariant.Specs, spec)

	// newVariant.Price, err = strconv.ParseFloat(line[3], 64)
	// if err != nil {
	// 	fmt.Println("Error converting price to float")
	// 	// break
	// }
	return newVariant
}