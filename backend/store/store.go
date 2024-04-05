package store

import (
	model "IITK_Mail/models"
	"context"
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoStore struct {
	Collection     *mongo.Collection
	UserCollection *mongo.Collection
}

var CON_STR string = "mongodb://localhost:27017"

func (m *MongoStore) OpenConnectionWithMongoDB() {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(CON_STR).SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}
	m.Collection = client.Database("mail").Collection("mails")
	m.UserCollection = client.Database("mail").Collection("user")
	fmt.Println("You successfully connected to MongoDB!")

}

func (m *MongoStore) GetMailsfromDatabase(filter bson.M) []model.Mail {
	opts := options.Find().SetSort(bson.D{{"timeseconds", -1}})
	cursor, err := m.Collection.Find(context.TODO(), filter, opts)
	var Mails []model.Mail

	if err = cursor.All(context.TODO(), &Mails); err != nil {
		panic(err)
	}

	return Mails
}

func (m *MongoStore) InsertUserData(user model.User) error {
	user.InboxIds = []int{}
	user.SendIds = []int{}
	user.TrashIds = []int{}
	user.StarredIds = []int{}
	user.SpamIds = []int{}
	user.UnReadMailIds = []int{}

	_, err := m.UserCollection.InsertOne(context.TODO(), user)
	return err
}

func (m *MongoStore) IsUserExist(filter bson.M) (bool, model.User) {
	var userDB model.User
	err := m.UserCollection.FindOne(context.TODO(), filter).Decode(&userDB)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// No user //given credentials
			return false, model.User{}
		}
		panic(err)
	}
	return true, userDB
}

func (m *MongoStore) GetUserMailIds(User model.User) []int {
	filter := bson.M{
		"email": User.Email,
	}
	var userDB model.User
	err := m.UserCollection.FindOne(context.TODO(), filter).Decode(&userDB)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// No user //given credentials
			return nil
		}
		panic(err)
	}
	return userDB.InboxIds

}

// func (m *MongoStore) AddMailToInbox(user model.User, MailID int) {
// 	exists := false
// 	if len(user.InboxIds) > 0 {
// 		for _, id := range user.InboxIds {
// 			if id == MailID {
// 				exists = true
// 				break
// 			}
// 		}
// 	}
// 	if !exists {
// 		filter := bson.M{
// 			"email": user.Email,
// 		}
// 		update := bson.M{
// 			"$push": bson.M{"inboxids": MailID},
// 		}
// 		_, err := m.UserCollection.UpdateOne(context.TODO(), filter, update)
// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 	}

// 	return

// }
func (m *MongoStore) AddMailToSent(user model.User, mailID int) {
	exists := false
	if len(user.SendIds) > 0 {
		for _, id := range user.SendIds {
			if id == mailID {
				exists = true
				break
			}
		}
	}
	if !exists {
		filter := bson.M{
			"email": user.Email,
		}
		update := bson.M{
			"$push": bson.M{"sendids": mailID},
		}
		_, err := m.UserCollection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Fatal(err)
		}
	}
}
func (m *MongoStore) AddMailToInbox(user model.User, mailID int) {
	exists := false
	if len(user.InboxIds) > 0 {
		for _, id := range user.InboxIds {
			if id == mailID {
				exists = true
				break
			}
		}
	}
	if !exists {
		filter := bson.M{
			"email": user.Email,
		}
		update := bson.M{
			"$push": bson.M{"inboxids": mailID},
		}
		_, err := m.UserCollection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Fatal(err)
		}
	}
}
func (m *MongoStore) AddMailToUnReadMails(user model.User, mailID int) {
	exists := false
	if len(user.UnReadMailIds) > 0 {
		for _, id := range user.UnReadMailIds {
			if id == mailID {
				exists = true
				break
			}
		}
	}
	if !exists {
		filter := bson.M{
			"email": user.Email,
		}
		update := bson.M{
			"$push": bson.M{"inboxids": mailID},
		}
		_, err := m.UserCollection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func (m *MongoStore) AddMailToTrash(user model.User, mailID int) {
	exists := false
	if len(user.TrashIds) > 0 {
		for _, id := range user.TrashIds {
			if id == mailID {
				exists = true
				break
			}
		}
	}
	if !exists {
		filter := bson.M{
			"email": user.Email,
		}
		update := bson.M{
			"$push": bson.M{"trashids": mailID},
		}
		_, err := m.UserCollection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func (m *MongoStore) AddMailToStarred(user model.User, mailID int) {
	exists := false
	if len(user.StarredIds) > 0 {
		for _, id := range user.StarredIds {
			if id == mailID {
				exists = true
				break
			}
		}
	}
	if !exists {
		filter := bson.M{
			"email": user.Email,
		}
		update := bson.M{
			"$push": bson.M{"starredids": mailID},
		}
		_, err := m.UserCollection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func (m *MongoStore) AddMailToSpam(user model.User, mailID int) {
	exists := false
	if len(user.SpamIds) > 0 {
		for _, id := range user.SpamIds {
			if id == mailID {
				exists = true
				break
			}
		}
	}
	if !exists {
		filter := bson.M{
			"email": user.Email,
		}
		update := bson.M{
			"$push": bson.M{"spamids": mailID},
		}
		_, err := m.UserCollection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func (m *MongoStore) SendMailHelper(email string, Mail model.Mail) error {
	// var fromData model.User
	var toData model.User
	toFilter := bson.M{
		"email": Mail.Recipient,
	}
	fromFilter := bson.M{
		"email": email,
	}
	// c.JSON(http.StatusAccepted, UserSubscribe)
	isToUser, toData := m.IsUserExist(toFilter)
	if isToUser {
		m.AddMailToInbox(toData, Mail.ID)
		m.AddMailToUnReadMails(toData, Mail.ID)
	}
	isFromUser, fromData := m.IsUserExist(fromFilter)
	if isFromUser {
		m.AddMailToSent(fromData, Mail.ID)
	}
	c.IndentedJSON(http.StatusOK, "Email Sent")
	// mongoStore.Subcribe(userData, UserSubscribe.BlogId)
	// c.JSON(http.StatusAccepted, userData)

	// // c.IndentedJSON(http.StatusOK, UserSubscribe)

}
