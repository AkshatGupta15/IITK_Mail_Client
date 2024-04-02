package store

import (
	model "IITK_Mail/models"
	"context"
	"fmt"

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

	// Use the SetServerAPIOptions() method to set the version of the Stable API on the client
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(CON_STR).SetServerAPIOptions(serverAPI)

	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	m.Collection = client.Database("mail").Collection("mails")
	m.UserCollection = client.Database("mail").Collection("user")
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")

}

func (m *MongoStore) GetMailsfromDatabase(filter bson.M) {
	opts := options.Find().SetSort(bson.D{{"timeseconds", -1}})
	cursor, err := m.Collection.Find(context.TODO(), filter, opts)
	var Mails []model.Mail

	if err = cursor.All(context.TODO(), &Mails); err != nil {
		panic(err)
	}

	fmt.Println(Mails)
	return
}

func (m *MongoStore) InsertUserData(user model.User) error {

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
