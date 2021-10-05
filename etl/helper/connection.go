package helper

import (
	"context"
	// "encoding/json"
	"log"
	"sync"
	// "net/http"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"mnt/c/Users/honey/Documents/web-resources/react/skin-and-body/etl/env"
)

// ConnectionDB, helper function to connect to mongo
// func ConnectDB() *mongo.Collection {
// 	connectionString := "mongodb://" + env.MongoConfig.Host + ":" + env.MongoConfig.Port

// 	// set client options
// 	clientOptions := options.Client().ApplyURI(connectionString)

// 	// connect to mongo
// 	client, err := mongo.Connect(context.TODO(), clientOptions)

// 	if err != nil {
// 		fmt.Println("Error connecting to MongoDB")
// 		log.Fatal(err)
// 	}

// 	collection := client.Database("sabdb").Collection("products")

// 	return collection
// }

var (
	// Instance *ac
	// clientInstance *mongo.Client
	ClientInstance *ac
	clientInstanceErr error
	mongoOnce sync.Once
)

type ac struct {
	MongoDB *mongo.Client
	Context context.Context
}

// func init() {
func Initialize() {
	// fmt.Println("init()")

	// create instance of clientInstance
	a := &ac{}
	ClientInstance = a
	ClientInstance.Context = context.Background()

	SetConnection()

	if clientInstanceErr != nil {
		log.Fatal(clientInstanceErr)
	}
}

func SetConnection() {
	// perform connection creation only once
	mongoOnce.Do(func() {
		// set connection string
		connectionString := "mongodb://" + env.MongoConfig.Host + ":" + env.MongoConfig.Port

		// set client options
		clientOptions := options.Client().ApplyURI(connectionString)

		// connect to MongoDB
		client, err := mongo.Connect(context.TODO(), clientOptions)
		if err != nil {
			clientInstanceErr = err
		}

		// check connection
		err = client.Ping(context.TODO(), nil)
		if err != nil {
			clientInstanceErr = err
		}

		ClientInstance.MongoDB = client
	})
}