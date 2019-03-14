# Node Mongo REST API app

This application has following APIs:
* `POST /user/login` Login a user. Required parameters are email and password. Default password is `secret`
* `POST /user/logout` Logout a user.
* `GET /user` Returns all the users.
* `POST /user/updatephoto` Update profile photo of the user. Required parameters are `photo` an image file.
* `GET /post` Returns all the posts of the user.
##### All the APIs need JWT token in format of `Authorization: Bearer ${token}` in the headers except login route.

### Setup of application
- Clone the repo and run `npm install` to install all npm dependencies.
- Configure the database settings in `config/keys.js` file.
- Goto `scripts` directory and run `node loadData.js` and `node merge.js` to seed the database.
- Run `npm run start` to start the application.
- The application is ready to be used.