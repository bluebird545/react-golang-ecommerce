// set variables for ip and port of mongo db
package env

func init() {
	MongoConfig.Host = "localhost"
	MongoConfig.Port = "27017"
	MongoConfig.Name = "sabdb"
}