package load

import (
	"fmt"
	"log"
	"encoding/csv"
	"os"
	model "mnt/c/Users/honey/Desktop/react/skin-and-body/etl/app/models"
)

// FileReader struct ...
type FileReader struct {
	// Ifs  model.InputFileSetting
	File *os.File
}
func Load() ([]model.Item, error) {
	fmt.Println("Loading data...")
	var filePath = "../data/products.csv"
	

	// read file
	csv, ae := GetCsvReader(filePath)
	if ae != nil {
		log.Fatal(ae)
		return nil, ae
	}
	return csv, nil
}


func GetCsvReader(filePath string) ([]model.Item, error) {
	fmt.Println("GetCsvReader()")
	fmt.Println(filePath)

	// open the file to read
	var err error
	var csvFile *os.File = nil
	csvFile, err = os.Open(filePath)
	if err != nil {
		log.Fatal(err)
	}
	defer csvFile.Close()

	// set the file csv setting for proper reading
	reader := csv.NewReader(csvFile)

	// c.Comma = 
	reader.FieldsPerRecord = 12

	rawCSVdata, err := reader.ReadAll()

	if err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
	var item model.Item
	var items []model.Item

	for _, record := range rawCSVdata {
		item.ProductID = record[0]
		item.Handle = record[1]
		items = append(items, item)
	}
	fmt.Println(items)
	return items, nil
}