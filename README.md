# Nodejs Mailer App

This nodejs mailer app was made ussign [Nodemailer library](https://nodemailer.com/about/).

This application was made with the intention of providing a backend that will convert json from the contact section of my web portfolio to emails.

The parameters it takes into account are:

```json
{ "name": "string", "email": "string", "message": "string" }
```

The backend is in charge of validating the fields and sending them to my mailbox. If they are not correct, return an error 400.
