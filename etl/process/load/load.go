package load

import (
	"fmt"
	"log"
	"context"
	"time"
	// "reflect"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"

	"mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/helper"
	"mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/env"
	model "mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/models"
)

func LoadProducts(line interface{}) {	
	// fmt.Println(reflect.TypeOf(line))
	// fmt.Println(line.ProductID)
	v := line.(model.Item)
	// fmt.Println(v.ProductID)
	filter := bson.D{primitive.E{Key: "product_id", Value: v.ProductID}}

	collection := helper.ClientInstance.MongoDB.Database(env.MongoConfig.Name).Collection(env.MongoConfig.Collection)

	opts := options.Count().SetMaxTime(2 * time.Second)

	count, err := collection.CountDocuments(context.TODO(), filter, opts)
	if err != nil {
		log.Fatal(err)
	}
	
	if count > 0 {
		// fmt.Printf("product_id 1111 appears in %v documents \n", count)
	} else {
		// fmt.Println("add document")
		_, err := collection.InsertOne(context.TODO(), line)
		if err != nil {
			fmt.Println(err)
			log.Fatal("MongoDB error!")
		}
	}

	// err := collection.Find(context.TODO(), filter).Limit(1);
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// fmt.Println("it exists")

	// _, err := collection.InsertOne(context.TODO(), line)
	// if err != nil {
	// 	fmt.Println(err)
	// 	log.Fatal("MongoDB error!")
	// }
	// return true
}

func LoadVariants(line interface{}) {
	v := line.(model.VariantModel)
	filter := bson.D{primitive.E{Key: "product_id", Value: v.ProductID}}
	
	collection := helper.ClientInstance.MongoDB.Database(env.MongoConfig.Name).Collection(env.MongoConfig.Collection)

	// check if document with product_id already exists
	opts := options.Count().SetMaxTime(2 * time.Second)

	count, err := collection.CountDocuments(context.TODO(), filter, opts)
	if err != nil {
		log.Fatal(err)
	}
	
	if count > 0 {
		// update document with new spec
		opts := options.Update().SetUpsert(true)
		filter := bson.D{primitive.E{Key: "product_id", Value: v.ProductID}}
		update := bson.D{{"$addToSet", bson.D{{"specs", v.Specs[0]}}}}
	
		result, err := collection.UpdateOne(context.TODO(), filter, update, opts)
		if err != nil {
			log.Fatal(err)
		}
		
		if result.MatchedCount != 0 {
			fmt.Println("matched and replaced an existing document")
			return
		}
		if result.UpsertedCount != 0 {
			fmt.Printf("inserted a new document with ID %v\n", result.UpsertedID)
		}
	} else {
		_, err := collection.InsertOne(context.TODO(), line)
		if err != nil {
			fmt.Println(err)
			log.Fatal("MongoDB error!")
		}
	}
	

	
}

// func checkIfExists(collection *mongo.Client, opts options, query bson.D{}) {

// }