package routes

import (
	"IITK_Mail/controllers"
	model "IITK_Mail/models"
	"IITK_Mail/store"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func Route() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173/"}, // List of allowed origins
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Authorization", "Content-Type"},
		AllowCredentials: true, // Enable sending credentials
	}))

	// Initialize MongoStore
	mongoStore := &store.MongoStore{}
	mongoStore.OpenConnectionWithMongoDB()

	// Register route
	router.POST("/register", func(ctx *gin.Context) {
		controllers.RegisterHelper(ctx, mongoStore)
	})

	// Login route
	router.POST("/login", func(c *gin.Context) {
		controllers.LoginHelper(c, mongoStore)
	})

	// Get all mails route
	router.GET("/mails", func(c *gin.Context) {
		filter := bson.M{}
		Mails := mongoStore.GetMailsfromDatabase(filter)
		c.IndentedJSON(http.StatusOK, Mails)
	})

	// Get user mails route
	router.POST("/usermails", func(c *gin.Context) {
		var user model.User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		MailIDs := mongoStore.GetUserMailIds(user)
		filter := bson.M{
			"id": bson.M{
				"$in": MailIDs,
			},
		}
		Mails := mongoStore.GetMailsfromDatabase(filter)
		c.JSON(http.StatusAccepted, Mails)
	})
	// Add mail to sent route
	router.POST("/sendMail", func(c *gin.Context) {
		var request struct {
			Email string     `json:"email"`
			Mail  model.Mail `json:"mail"`
		}
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		fmt.Println(request)
		controllers.SendMailHelper(request.Email, request.Mail)
		c.JSON(http.StatusAccepted, gin.H{"message": "Mail added to sent successfully"})
	})

	// Add mail to trash route
	router.POST("/addtotrash", func(c *gin.Context) {
		var request struct {
			User   model.User `json:"user"`
			MailID int        `json:"mailID"`
		}
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		mongoStore.AddMailToTrash(request.User, request.MailID)
		c.JSON(http.StatusAccepted, gin.H{"message": "Mail added to trash successfully"})
	})

	// Add mail to starred route
	router.POST("/addtostarred", func(c *gin.Context) {
		var request struct {
			User   model.User `json:"user"`
			MailID int        `json:"mailID"`
		}
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		mongoStore.AddMailToStarred(request.User, request.MailID)
		c.JSON(http.StatusAccepted, gin.H{"message": "Mail added to starred successfully"})
	})

	// Add mail to spam route
	router.POST("/addtospam", func(c *gin.Context) {
		var request struct {
			User   model.User `json:"user"`
			MailID int        `json:"mailID"`
		}
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
		mongoStore.AddMailToSpam(request.User, request.MailID)
		c.JSON(http.StatusAccepted, gin.H{"message": "Mail added to spam successfully"})
	})

	router.Run(":8080")
}
