package model

type User struct {
	Username      string `json:"username"`
	Email         string `json:"email"`
	Password      string `json:"password"`
	InboxIds      []int  `json:"inboxids"`
	SendIds       []int  `json:"sendids"`
	TrashIds      []int  `json:"trashids"`
	StarredIds    []int  `json:"starredids"`
	SpamIds       []int  `json:"spamids"`
	UnReadMailIds []int  `json:"unreadmailids"`
}

type Mail struct {
	ID        int    `json:"id"`
	Sender    string `json:"sender"`
	Recipient string `json:"recipient"`
	Subject   string `json:"subject"`
	Body      string `json:"body"`
	// Timestamp time.Time `json:"timestamp"`
}

type Mails struct {
	Mails []Mail
}
