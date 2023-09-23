# Social Media app backend

### Introduction

backend for social media app

### Project Support Features

- register new account
- update user info
- follow other users
- unfollow other users
- delete users account
- login
- get spesifc user data
- get all users data
- create new post
- update post content
- like posts
- unlike posts
- delete posts
- get post data
- get user timeline
- get user posts

### Installation Guide

- Clone this repository [here](https://github.com/blackdevelopa/ProjectSupport.git).
- The develop branch is the most stable branch at any given time, ensure you're working from it.
- Run npm install to install all dependencies
- You can either work with the default mLab database or use your locally installed MongoDB. Do configure to your choice in the application entry file.
- Create an .env file in your project root folder and add your variables. See .env.sample for assistance.

### Usage

- Run npm start:dev to start the application.
- Connect to the API using Postman on port 8800.

### API Endpoints

| POST | /api/auth/register | To sign up a new user account |
| POST | /api/auth/login | To login an existing user account |
| PUT | /api/users/:userId | update user info |
| PUT | /api/users/:userId/follow | follow users |
| PUT | /api/users/:userId/unfollow | unfollow users |
| DELETE | api/users/:userId | delete user |
| GET | /api/users/:userId | get user data |
| GET | /api/users | get all users data |
| POST | /api/posts | create new post |
| PUT | /api/posts/:postId | update post info |
| Put | /api/posts/:postId/like | like post |
| DELETE |/api/posts/:postId | delete post |
| GET | /api/posts/:userId | get user posts |
| GET | /api/posts/timeline/:userId | get user own and friends posts |

### Technologies Used

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
- [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

### Author

- Website - [Abdullah hamdy Alatawwna](http://chicodiv.com/)
- Github - [Abdullah hamdy Alatawwna](https://github.com/DivChico)

### License

This project is available for use under the MIT License.
