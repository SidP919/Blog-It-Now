# Blog-It-Now Backend

This is the backend codebase of the Blog-It-Now Application. The backend application for the Blog-It-Now is a Node.js API project.

## Table of Contents

- [Tech Stack of Blog-It-Now](#tech-stack-of-blog-it-now)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run Backend Server](#run-backend-server)
- [API Endpoints](#api-endpoints)
- [Congratulations & Notes](#congratulations)
- [License](#license)
- [About Me](#developed-by)

# Tech Stack of Blog-It-Now

__Frontend:__\
![React Native](https://img.shields.io/badge/-React_Native-333333?style=flat&logo=REACT&logoColor=61DAFB&labelColor=000000)
![ReactJS](https://img.shields.io/badge/-ReactJS-333333?style=flat&logo=REACT&logoColor=61DAFB&labelColor=000000)
![Android](https://img.shields.io/badge/-Android-333333?style=flat&logo=android&logoColor=34A853&labelColor=000000)
![Redux Toolkit](https://img.shields.io/badge/-Redux_Toolkit-333333?style=flat&logo=redux&logoColor=764ABC&labelColor=000000)
![React Router](https://img.shields.io/badge/-React_Router-333333?style=flat&logo=reactrouter&logoColor=CA4245&labelColor=000000)
![React Navigation](https://img.shields.io/badge/-React_Navigation-333333?style=flat&logo=react&labelColor=000000)
![JavaScript](https://img.shields.io/badge/-JavaScript-333333?style=flat&logo=javascript&labelColor=000000)
![CSS](https://img.shields.io/badge/-CSS-333333?style=flat&logo=CSS3&logoColor=1572B6&labelColor=000000)
![HTML](https://img.shields.io/badge/-HTML-333333?style=flat&logo=HTML5&labelColor=000000)\
__Backend:__\
![Node.js](https://img.shields.io/badge/-Node.js-333333?style=flat&logo=node.js&labelColor=000000)
![Express](https://img.shields.io/badge/-ExpressJS-333333?style=flat&logo=express&labelColor=000000)
![MongoDB](https://img.shields.io/badge/-MongoDB-333333?style=flat&logo=mongodb&labelColor=000000)
![Mongoose](https://img.shields.io/badge/-Mongoose-333333?style=flat&logo=mongoose&logoColor=880000&labelColor=000000)
![JSON Web Tokens](https://img.shields.io/badge/-JSON_Web_Tokens-333333?style=flat&logo=jsonwebtokens&logoColor=ffffff&labelColor=000000)
[![Nodemailer](https://img.shields.io/badge/-Nodemailer-333333?style=flat&logo=gmail&logoColor=EA4335&labelColor=000000)](mailto:Sidp0008@gmail.com)
![Handlebars](https://img.shields.io/badge/-Handlebars-333333?style=flat&logo=handlebarsdotjs&logoColor=ffffff&labelColor=000000)\
__Others:__\
![NPM](https://img.shields.io/badge/-Npm-333333?style=flat&logo=npm&logoColor=white&labelColor=000000)
![Git](https://img.shields.io/badge/-Git-333333?style=flat&logo=git&labelColor=000000)
![GitHub](https://img.shields.io/badge/-GitHub-333333?style=flat&logo=github&labelColor=000000)
![ESLint](https://img.shields.io/badge/-ESLint-333333?style=flat&logo=eslint&logoColor=4B32C3&labelColor=000000)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation
- Install Dependencies
    ```bash
    npm install
    ```
### Run Backend Server
- Run below command to start the backend server to listen on port:4000
    ```bash
    npm run dev
    ```

## API Endpoints

> Below are the API endpoints that our Blog-It-Now application is exposing to our frontend application to consume.

1. __REGISTER__
    - __Request Type:__ POST
    - __API Endpoint:__ http://localhost:4000/api/v1/auth/register
    - __Description:__ Creates a user account and sends verification email to the new user's registered email address.
    - __HEADERS:__
        - Content-Type: application/json

    - __Body:__ raw (json)
        ```json
        {
            "fullname": "Abcd Efgh",
            "email": "abcd1234@gmail.com",
            "username": "abcd1234",
            "password": "password123",
            "favoriteContent": "Show: The Mentalist"
        }
        ```

1. __LOGIN__
    - __Request Type:__ POST
    - __API Endpoint:__ http://localhost:4000/api/v1/auth/login
    - __Description:__ Log-in the user. It can be accessed by the registered and verfied user only.
    - __HEADERS:__
        - Content-Type: application/json

    - __Body:__ raw (json)
        ```json
       {
            "emailOrUsername": "abcd1234",
            "password": "password@123"
        }
        ```

1. __PROTECTED__
    - __Request Type:__ POST
    - __API Endpoint:__ http://localhost:4000/api/v1/auth/protected
    - __Description:__ This route can only be accessed by an already logged-in user.
    - __HEADERS:__
        - Authorization: Bearer `<AUTH_TOKEN>`

1. __LOGOUT__
    - __Request Type:__ POST
    - __API Endpoint:__ http://localhost:4000/api/v1/auth/logout
    - __Description:__ Logout the logged-in user.
    - __HEADERS:__
        - Authorization: Bearer `<AUTH_TOKEN>`

1. __PASSWORD RESET REQ__
    - __Request Type:__ POST
    - __API Endpoint:__ http://localhost:4000/api/v1/auth/passwordResetRequest
    - __Description:__ Sends a password reset link in an email to user's registered email address.
    - __HEADERS:__
        - Authorization: Bearer `<AUTH_TOKEN>`

    - __Body:__ raw (json)
        ```json
        {
            "email": "abcd1234@gmail.com"
        }
        ```

1. __DELETE_ACCOUNT__
    - __Request Type:__ POST
    - __API Endpoint:__ http://localhost:4000/api/v1/auth/deleteAccount
    - __Description:__ Deletes the user account. It can only be accessed when the user has a verified registered email address and is already logged-in i.e. there is a valid `AUTH_TOKEN` present in the request header.
    - __HEADERS:__
        - Authorization: Bearer `<AUTH_TOKEN>`
        - Content-Type: application/json
    - __Body:__ raw (json)
        ```json
       {
            "email": "abcd1234@gmail.com",
            "password": "password@123"
        }
        ```

1. __GET OTHER DATA__
    - __Request Type:__ GET
    - __API Endpoint:__ http://localhost:4000/api/v1/otherData/getData?key=ANDROID_DOWNLOAD_LINK
    - __Description:__ Fetches the data stored in DB based on the key name passed in query params.
    - __Query Params:__
        ```js
       key=ANDROID_DOWNLOAD_LINK
        ```

1. __CREATE OTHER DATA__
    - __Request Type:__ POST
    - __API Endpoint:__ http://localhost:4000/api/v1/otherData/createData
    - __Description:__ Can only be accessed by user with Level 4 access(Admin).
    - __HEADERS:__
        - Authorization: Bearer `<AUTH_TOKEN>`
        - Content-Type: application/json
    - __Body:__ raw (json)
        ```json
        {
            "key": "IOS_DOWNLOAD_LINK",
            "value": "https://www.apple.com/"
        }
        ```

1. __Few other API Endpoints:__
    - __VERIFY EMAIL:__ This is not accessible directly as its link is generated inside the __`REGISTER`__ API execution and sent in an email to user's registered email address for verification.
    - __RESET PASSWORD:__ This is not accessible directly as its link is generated inside the __`PASSWORD RESET REQ`__ API execution and sent in an email to user's registered email address for resetting the password.

## Congratulations

🎉 You're successfully running our Node.js Backend Server 🥳 and are free to test the APIs we developed so far in this project mentioned under [API Endpoints](#api-endpoints) or make changes in files in `controllers` folder locally for now if you find any issue or can improve some code.\
We will update this README file once we are ready to allow contributions from others & consider pull-requests for the same.

### Now what?

- If you haven't setup the frontend of this full-stack application yet, you can [Go to Frontend](https://github.com/SidP919/Blog-It-Now/tree/Main/DPB_Application_Frontend#readme).

<!-- - You can work on any of the open issues in this repository or you can raise new issues, if you find any, and start working on them, once done you can raise a pull-request to be merged in this repository. -->

- If you're new & curious to learn more about Node.js, check out the [Introduction to Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs).

## License

This project is licensed under the [MIT License](https://github.com/SidP919/Blog-It-Now#MIT-1-ov-file).

<br>

<span style="font-size:larger;">

[🔼 Back to Top](#readme)

</span>

## Developed By

<div style="font-size:large;">

**Sidharth Pandey** <img src="../DPB_Application_Frontend/src/assets/india.png" width=24 />

[![Email](https://img.shields.io/badge/-Contact_Me-FF671F?style=flat&logo=gmail&logoColor=FF671F&labelColor=ffffff)](mailto:Sidp0008@gmail.com) 
[![LinkedIn](https://img.shields.io/badge/-Connect_with_me-06038D?logo=linkedin&logoColor=06038D&labelColor=ffffff)](https://linkedin.com/in/sidp919) 
[![Blog It Now](https://img.shields.io/badge/-Blog_It_Now-046A38?logo=gmail&logoColor=046A38&labelColor=ffffff)](mailto:blog.it.now.app@gmail.com) 

**Happy Learning!** 😊

</div>
<br>

---
