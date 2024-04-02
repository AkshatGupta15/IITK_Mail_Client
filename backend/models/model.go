package model

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Mail struct {
	Id        int    `json:"id"`
	Sender    string `json:"sender"`
	Recipient string `json:"recipient"`
	Subject   string `json:"subject"`
	Body      string `json:"body"`
}

type Mails struct {
	Mails []Mail
}
