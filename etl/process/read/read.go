package read

import (
	"fmt"
	"strings"
	"strconv"
	// "reflect"

	model "mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/models"
)

func ReadProducts(line []string, v interface{}) interface{} {
	// fmt.Println("reading for products...")

	// s := reflect.New(reflect.TypeOf(v)).Interface()
	// s.ProductID = {"123"}
	// fmt.Println("result", s)

	var err error
	var newProduct = &model.Item{}
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

func ReadVariants(line []string) interface{} {
	// fmt.Println("reading for variants...")
	var err error
	var newVariant = &model.VariantModel{}
	newVariant.ProductID = line[0]
	newVariant.Specs = &model.Spec{line[1], line[2]}
	newVariant.Price, err = strconv.ParseFloat(line[3], 64)
	if err != nil {
		fmt.Println("Error converting price to float")
		// break
	}
	return newVariant
}

// package read

// import (
// 	"fmt"
// 	"os"
// 	"encoding/csv"
// 	"sync/atomic"

// 	// model "mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/models"
// )

// type ProcessChannel struct {
// 	File 			 string // file to read
// 	StructName string // struct to be used
// }

// // global vairables
// var (
// 	// connection to mongodb "products" collection
// 	// collection = helper.ConnectDB()

// 	// loadType *string

// 	// ETL process variables
// 	gContinueProcessing        bool
// 	gReadDone                  bool
// 	gReadLineSkip              int64
// 	gReadLineCounter           int64
// 	gReadProccessedCounter     int64
// 	gTransformProcessedCounter int64
// 	gWriteProcessedCounter     int64
// 	gBulkQueueCounter          int64
// 	gBulkQueuesTotalCounter    int64
// 	gBulkRunCounter            int64
// )

// func Process(typeFlag, m *ProcessChannel) error {
// 	gContinueProcessing = true
// 	gReadLineSkip = 1
// 	fmt.Println("File path:", m.File)	

// 	// readDoneCh := make(chan bool)
// 	allDoneCh := make(chan bool)



// 	go Read(m, allDoneCh)
// 	// go Transform()
// 	// go Load()

// 	for {
// 		if !gContinueProcessing {
// 			fmt.Println("ALL DONE!")
// 			break
// 		}

// 		select {
// 		case <-allDoneCh:
// 			fmt.Println("allDoneCh received in main()")
// 			gContinueProcessing = false
// 		}
// 	}

// 	fmt.Printf("Number of lines to read:..........%v\n", gReadLineCounter)
// 	fmt.Printf("Number of lines skipped:..........%v\n", gReadLineSkip)
// 	fmt.Printf("Number of lines read:.............%v\n", gReadProccessedCounter)

// 	return nil
// }

// func Read(
// 	m *ProcessChannel,
// 	// readDoneCh chan bool, 
// 	allDoneCh chan bool) {

// 	fmt.Println("Reading...")
// 	file, _ := os.Open(m.File)
// 	defer file.Close()
// 	reader := csv.NewReader(file)

// 	lines, err := reader.ReadAll()
// 	if err != nil {
// 		fmt.Println("Error reading file")
// 		// log.Fatal(err)
// 	}

// 	for _, line := range lines {
// 		// increment file line counter
// 		atomic.AddInt64(&gReadLineCounter, 1)

// 		if len(line) == 0 {
// 			fmt.Println("Value from the key field is missing")
// 		} else {
// 				if gReadLineCounter > gReadLineSkip {
// 					// increment # of lines already processed
// 					atomic.AddInt64(&gReadProccessedCounter, 1)
					
// 					// var newProduct = &model.Item{}
// 					// newProduct.ProductID = line[0]
// 					// newProduct.Handle = line[1]
// 					// newProduct.Name = line[2]
// 					// newProduct.Collection = line[3]
// 					// // tags
// 					// tags := strings.Fields(line[4])
// 					// newProduct.Tags = tags
// 					// // variant of item
// 					// var variants []*model.Variant
// 					// var variant = &model.Variant{line[5], line[6]}
// 					// variants = append(variants, variant)
// 					// newProduct.Variants = variants
// 					// newProduct.Price, err = strconv.ParseFloat(line[7], 64)
// 					// if err != nil {
// 					// 	fmt.Println("Error converting price to float")
// 					// 	break
// 					// }
// 					// // image details
// 					// var image = &model.ProductImage{line[8], line[9]}
// 					// newProduct.Image = image
// 					// // construct ingredients array
// 					// ingredients := strings.Fields(line[10])
// 					// newProduct.Ingredients = ingredients
// 					// transformCh <- newProduct
// 				}
// 		}
// 	}

// 	// readDoneCh <- true
// 	allDoneCh <- true
// }

// func ReadProducts() {

// }

// func ReadVariants() {

// }