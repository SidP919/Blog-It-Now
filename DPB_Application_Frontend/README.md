# Blog-It-Now Frontend

This is the frontend codebase of the Blog-It-Now Application. The frontend application for the Blog-It-Now is a [**React Native**](https://reactnative.dev) application project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). This app has been manually tested and found to be working fine on Android & Web platforms at the time of last commit in this repository.

**NOTE:** _This app has been developed **without** using Expo._

## Table of Contents

- [Tech Stack of Blog-It-Now](#tech-stack-of-blog-it-now)
- [Getting Started](#getting-started)
  - [Step 1: Start the Metro Server](#step-1-start-the-metro-server)
  - [Step 2: Start your Application](#step-2-start-your-application)
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

# Getting Started

> **Note**: Before you clone & run this project on your personal machine, please make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step at least once before and have confirmed that there is no pre-existing setup issue on your machine. Once you have confirm that you can proceed and run `npm install` to install all the frontend related dependencies/packages.

```bash
    cd DPB_Application_Frontend
    npm install
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For Web

```bash
# using npm
npm run start-web

# OR using Yarn
yarn start-web
```

### For iOS (Note: This app hasn't been tested on iOS)

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

__Note:__If your backend is running in dev env at http://localhost:4000\
Then, android emulator will throw error when calling any backend API.\
To resolve this error:
- in command-prompt terminal,\
  please run: `ipconfig`
- Copy the IPv4 address and replace it with "localhost" in DEV_URL in `\src\utils\constants.js`

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or your default _web-browser_ or your _iOS Simulator_ shortly, provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

<!-- ## Step 3: Modifying the Application code

Now, you can modify the application code and add more features/improvements to the application(you can start with making changes inside `src/screens` folder), __frontend or more specifically UI changes that make the app look better have a higher chance of being merged into the original code.__ -->

## Congratulations

🎉 You've successfully run our React Native App 🥳 and are free to make changes locally for now.\
We will update this README file once we are ready to allow contributions from others & consider pull-requests for the same.

### Now what?

- If you haven't setup the backend of this full-stack application yet, you can [go to Backend Section](https://github.com/SidP919/Blog-It-Now/tree/Main/DPB_Application_Backend#readme).

<!-- - You can work on any of the open issues in this repository or you can raise new issues, if you find any, and start working on them, once done you can raise a pull-request to be merged in this repository. -->

- If you're new & curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## License

This project is licensed under the [MIT License](https://github.com/SidP919/Blog-It-Now#MIT-1-ov-file).

<br>

<span style="font-size:larger;">

[🔼 Back to Top](#readme)

</span>

## Developed By

<div style="font-size:large;">

**Sidharth Pandey** <img src="./src/assets/india.png" width=24 />

[![Email](https://img.shields.io/badge/-Contact_Me-FF671F?style=flat&logo=gmail&logoColor=FF671F&labelColor=ffffff)](mailto:Sidp0008@gmail.com) 
[![LinkedIn](https://img.shields.io/badge/-Connect_with_me-06038D?logo=linkedin&logoColor=06038D&labelColor=ffffff)](https://linkedin.com/in/sidp919) 
[![Blog It Now](https://img.shields.io/badge/-Blog_It_Now-046A38?logo=gmail&logoColor=046A38&labelColor=ffffff)](mailto:blog.it.now.app@gmail.com) 

**Happy Learning!** 😊

</div>
<br>

---