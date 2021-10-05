package env

type mongoConfig struct {
	Host       string
	Port 			 string
	Name       string
	Collection string
}

var MongoConfig mongoConfig