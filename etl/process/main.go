package process

import (
	"fmt"
	"os"
	"encoding/csv"
	"sync/atomic"
	"reflect"

	// "mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/process/read"
	"mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/process/transform"
	"mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/process/load"
	// model "mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/models"
)

type EtlEngine struct {
	File 			 string // file to read
	StructName interface{} // struct to be used
	Type       string
	Template   interface{}
}

// global vairables
var (
	// connection to mongodb "products" collection
	// collection = helper.ConnectDB()

	// loadType *string
	info *EtlEngine
	// ETL process variables
	gContinueProcessing        bool
	gReadDone                  bool
	gReadLineSkip              int64
	gReadLineCounter           int64
	gReadProccessedCounter     int64
	gTransformProcessedCounter int64
	gWriteProcessedCounter     int64
	gBulkQueueCounter          int64
	gBulkQueuesTotalCounter    int64
	gBulkRunCounter            int64
)

func Process(t reflect.Type, p *EtlEngine) error {
	gContinueProcessing = true
	gReadLineSkip = 1
	

	readDoneCh := make(chan bool)
	// transformCh := make(chan interface{})
	transformCh := make(chan []string)
	transformDoneCh := make(chan bool)
	loadCh := make(chan interface{})
	allDoneCh := make(chan bool)

	go p.Read(readDoneCh, transformCh)
	go p.Transform(readDoneCh, transformCh, transformDoneCh, loadCh)
	go p.Load(transformDoneCh, loadCh, allDoneCh)

	for {
		if !gContinueProcessing {
			fmt.Println("ALL DONE!")
			break
		}

		select {
		case <-allDoneCh:
			// fmt.Println("allDoneCh received in main()")
			gContinueProcessing = false
		}
	}

	fmt.Printf("Number of lines to read:..........%v\n", gReadLineCounter)
	fmt.Printf("Number of lines skipped:..........%v\n", gReadLineSkip)
	fmt.Printf("Number of lines read:.............%v\n", gReadProccessedCounter)

	return nil
}

func (p *EtlEngine) Read(
	readDoneCh chan bool,
	// transformCh chan interface{},
	transformCh chan []string) {

	// fmt.Println("Reading...")
	file, _ := os.Open(p.File)
	defer file.Close()
	reader := csv.NewReader(file)

	lines, err := reader.ReadAll()
	if err != nil {
		fmt.Println("Error reading file")
		// log.Fatal(err)
	}

	for _, line := range lines {
		// fmt.Println(line)
		// increment file line counter
		atomic.AddInt64(&gReadLineCounter, 1)

		if len(line) == 0 {
			fmt.Println("Value from the key field is missing")
		} else {
				if gReadLineCounter > gReadLineSkip {
					// increment # of lines already processed
					atomic.AddInt64(&gReadProccessedCounter, 1)

					// var readLine interface{}
					// if p.Type == "products" {
					// 	readLine = read.ReadProducts(line, p.Template)
					// } else {
					// 	readLine = read.ReadVariants(line)
					// }
					// transformCh <- readLine
					transformCh <- line
				}
		}
	}

	readDoneCh <- true
}

func (p *EtlEngine) Transform(
	readDoneCh <-chan bool,
	// transformCh <-chan interface{},
	transformCh <-chan []string,
	transformDoneCh chan bool,
	loadCh chan interface{}) {
		for {
			select {
			case line := <-transformCh:
				// increment transform counter
				atomic.AddInt64(&gTransformProcessedCounter, 1)

				// check if transforming of all lines are done
				if gReadDone && (gReadProccessedCounter) == gTransformProcessedCounter {
					fmt.Printf("%s readDone, readCount[%v], transformCount[%v]\n", "transform()", gReadProccessedCounter, gTransformProcessedCounter)
					transformDoneCh <- true
					// allDoneCh <- true
				}

				var transformedLine interface{}
				// fmt.Println("TypeOf(transformedLine):", reflect.TypeOf(transformedLine))
				if p.Type == "products" {
					transformedLine = transform.TransformProducts(line, p.Template)
					// fmt.Println("TypeOf(transformedLine):", reflect.TypeOf(transformedLine))
					// fmt.Println("transformedLine.ProductID", transformedLine.ProductID)
					// loadCh <- transformedLine
				} else {
					transformedLine = transform.TransformVariants(line)
					// loadCh <- transformedLine
				}
				loadCh <- transformedLine
			case gReadDone = <-readDoneCh:
				if (gReadProccessedCounter) == gTransformProcessedCounter {
					transformDoneCh <- true
					// allDoneCh <- true
				}
			}
		}
}

func (p *EtlEngine) Load(
	transformDoneCh <-chan bool,
	loadCh <-chan interface{},
	allDoneCh chan bool) {
	for {
		select {
		case line := <-loadCh:
			// increment write counter
			atomic.AddInt64(&gWriteProcessedCounter, 1)

			// var loadingDone bool
			if p.Type == "products" {
				// loadingDone = load.LoadProducts(line)
				load.LoadProducts(line)
			} else {
				// loadingDone = load.LoadVariants(line)
				load.LoadVariants(line)
			}
			// fmt.Println("Is loading done?", loadingDone)
		case <-transformDoneCh:
			// fmt.Println("load() received transformDoneCh")
			allDoneCh <- true
		}
	}
}

// func Load(typeFlag, filePath string) {
// 	var structName string
// 	switch typeFlag {
// 	case "products":
// 		fmt.Printf("Loading %s from file %s\n",typeFlag, filePath)
// 		structName = &model.Products
// 		// env.MongoConfig.Collection = "products"
// 	case "variants":
// 		fmt.Printf("Loading %s from file %s\n",typeFlag, filePath)
// 		structName = &model.Variants{}
// 		// env.MongoConfig.Collection = "variants"
// 	}

// 	processChannel := &read.ProcessChannel{File: filePath, Struct: structName}
// 	// p := processChannel.Process()
// 	p := read.Process(typeFlag, processChannel)

// 	if p != nil {
// 		fmt.Println("ERROR: ", p)
// 	}

// }