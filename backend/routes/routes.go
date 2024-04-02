package Route

import (
	"IITK_Mail/store"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func Route() {

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:5173/"}, // List of allowed origins
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		AllowCredentials: true, // Enable sending credentials
	}))
	// Initialize MongoStore
	mongoStore := &store.MongoStore{}
	mongoStore.OpenConnectionWithMongoDB()
	router.GET("/Mails", func(c *gin.Context) {
		filter := bson.M{}
		mongoStore.GetMailsfromDatabase(filter)
		c.IndentedJSON(http.StatusOK, "Hello")
	})
	router.Run(":8080")
}
