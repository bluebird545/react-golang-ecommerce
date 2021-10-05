package main

import (
	"flag"
	"fmt"
	"reflect"
	// "log"
	// "time"
	// "os"
	// "encoding/csv"
	// "sync/atomic"
	// "strings"
	// "strconv"
	// "context"

	"mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/helper"
	"mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/env"
	client "mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/process"
	model "mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/models"
)

// global variables
var (
	// connection to mongodb "products" collection
	// collection = helper.ConnectDB()

	// loadType *string

	// ETL process variables
	// gContinueProcessing        bool
	// gReadDone                  bool
	// gReadLineSkip              int64
	// gReadLineCounter           int64
	// gReadProccessedCounter     int64
	// gTransformProcessedCounter int64
	// gWriteProcessedCounter     int64
	// gBulkQueueCounter          int64
	// gBulkQueuesTotalCounter    int64
	// gBulkRunCounter            int64
)

func main() {
	// set flags
	typeFlag := flag.String("t", "", "type: [products, variants]")
	flag.Parse()
	// loadType = typeFlag

	// if *typeFlag != ""{
		// client.Process(*typeFlag, filePath)
	// } else {
	// 	fmt.Println("Load error")
	// }
	processInfo := &client.EtlEngine{Type: *typeFlag}
	var filePath string
	var structName reflect.Type
	switch *typeFlag {
	case "products":
		filePath = "../data/products.csv"
		structName = reflect.TypeOf(model.Item{})
		env.MongoConfig.Collection = "products"
		processInfo.Template = model.Item{}
	case "variants":
		filePath = "../data/variants.csv"
		structName = reflect.TypeOf(model.VariantModel{})
		env.MongoConfig.Collection = "variants"
		processInfo.Template = model.VariantModel{}
	}
	processInfo.File = filePath
	processInfo.StructName = structName

	helper.Initialize()

	fmt.Println("MongoConfig:", env.MongoConfig)
	// processInfo := &client.EtlEngine{File: filePath, StructName: structName, Type: *typeFlag, Template: t}
	p := client.Process(reflect.TypeOf(model.Item{}), processInfo)
	if p!= nil {
		fmt.Println("ERROR")
	}


// 	start := time.Now()
// 	fmt.Println("Running ETL...")


// 	gContinueProcessing = true
// 	gReadLineSkip = 1

// 	// creating channels
// 	readDoneCh := make(chan bool)
// 	transformCh := make(chan *model.Item)
// 	transformDoneCh := make(chan bool)
// 	loadCh := make(chan *model.Item)
// 	allDoneCh := make(chan bool)

// 	go read(filePath, readDoneCh, transformCh)
// 	go transform(transformCh, transformDoneCh, readDoneCh, loadCh)
// 	go load(loadCh, transformDoneCh, allDoneCh)

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

// 	fmt.Println(time.Since(start))
}

// func read(
// 	filePath string, 
// 	readDoneCh chan bool, 
// 	transformCh chan *model.Item,
// ) {
// 	file, _ := os.Open(filePath)
// 	defer file.Close()
// 	reader := csv.NewReader(file)

// 	lines, err := reader.ReadAll()
// 	if err != nil {
// 		fmt.Println("Error reading file")
// 		log.Fatal(err)
// 	}

// 	// read each line
// 	for i, line := range lines {
// 		if i == len(lines) {
// 			fmt.Println("Read all lines")
// 		}

// 		// increment file line counter
// 		atomic.AddInt64(&gReadLineCounter, 1)

// 		if len(line) == 0 {
// 			fmt.Println("Value from the key field is missing")
// 		} else {
// 				if gReadLineCounter > gReadLineSkip {
// 					// increment # of lines already processed
// 					atomic.AddInt64(&gReadProccessedCounter, 1)
					
// 					var newProduct = &model.Item{}
// 					newProduct.ProductID = line[0]
// 					newProduct.Handle = line[1]
// 					newProduct.Name = line[2]
// 					newProduct.Collection = line[3]
// 					// tags
// 					tags := strings.Fields(line[4])
// 					newProduct.Tags = tags
// 					// variant of item
// 					var variants []*model.Variant
// 					var variant = &model.Variant{line[5], line[6]}
// 					variants = append(variants, variant)
// 					newProduct.Variants = variants
// 					newProduct.Price, err = strconv.ParseFloat(line[7], 64)
// 					if err != nil {
// 						fmt.Println("Error converting price to float")
// 						break
// 					}
// 					// image details
// 					var image = &model.ProductImage{line[8], line[9]}
// 					newProduct.Image = image
// 					// construct ingredients array
// 					ingredients := strings.Fields(line[10])
// 					newProduct.Ingredients = ingredients
// 					transformCh <- newProduct
// 				}
// 		}
// 	}

// 	readDoneCh <- true
// }

// func transform(
// 	transformCh <-chan *model.Item,
// 	transformDoneCh chan bool,
// 	readDoneCh <-chan bool,
// 	loadCh chan *model.Item,
// ) {
// 	for {
// 		select {
// 		case item := <-transformCh:
// 			// increment transform counter
// 			atomic.AddInt64(&gTransformProcessedCounter, 1)

// 			// check if transforming of all lines are done
// 			if gReadDone && (gReadProccessedCounter) == gTransformProcessedCounter {
// 				fmt.Printf("%s readDone, readCount[%v], transformCount[%v]\n", "transform()", gReadProccessedCounter, gTransformProcessedCounter)
// 				transformDoneCh <- true
// 			}

// 			item.Name = strings.ToUpper(item.Name)
// 			fmt.Println(item)

// 			loadCh <- item

// 		case gReadDone = <-readDoneCh: 
// 			if (gReadProccessedCounter) == gTransformProcessedCounter {
// 				fmt.Println("transform() received readDoneCh")
// 				transformDoneCh <- true
// 			}
// 		}
// 	}
// }

// func load(
// 	loadCh <-chan *model.Item, 
// 	transformDoneCh <-chan bool, 
// 	allDoneCh chan bool,
// ) {
// 	var items = []interface{}{}
// 	for {
// 		select {
// 		case item := <-loadCh:
// 			items = append(items, item)
// 			// increment write counter
// 			atomic.AddInt64(&gWriteProcessedCounter, 1)

// 			_, err := collection.InsertOne(context.TODO(), item)
// 			if err != nil {
// 				log.Fatal("MongoDB error!")
// 			}
// 		case <-transformDoneCh:
// 			fmt.Println("load() received transformDoneCh")
// 			allDoneCh <- true
// 		}
// 	}
// }