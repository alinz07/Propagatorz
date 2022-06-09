# Propagatorz

## **Link to deployed app on heroku**: https://propagatorz-plant-help.herokuapp.com/

</br>

## **Table of Contents**

-   [Motivation and Code Overview](#motivation-and-code-overview)
-   [Technologies Used](#technologies-used)
-   [User Story](#user-story)
-   [Instructions to Run App](#instructions-to-run-app)
-   [Screenshot](#screenshot)
-   [Contact Info/Maintainers](#contributors)
-   [Credits](#credits)

</br>

## **Motivation and Code Overview**

Propagatorz is a "plant help line" web application that allows users to share photos and notes regarding thier house plants.
Users will need to login or sign up first in order to start taking part in the discussions. Feel free to login with: betty@email.com and password: password. We're in the process of migrating the site to a faster host, but once accessed, the Single Page Application is very fast thanks to React. </br>

The app is organized in typical React fashion with a client folder and server folder. The server holds the db configuration, db models, schemas and utilities that support the models. The client folder holds all of the function components and page components as well as the build folder that uses webpack to minify and serve the React assets. The client side also has all of the mongoose and graphql queries/mutations/actions/reducers that are ran inside the components.

</br>

## **Technologies Used**

-   React
-   CSS Framework
-   [Mui](https://mui.com/material-ui/getting-started/installation/)
-   Node
-   Express
-   Bcrypt
-   MongoDB
-   Mongoose
-   GraphQL
-   Apollo Server
-   [Cloudinary](https://cloudinary.com/)
-   Nodemon
-   Day.js
-   JSON Web Tokens (JWT)

</br>

## **User Story**

As an owner of beautiful plant babies, I want to network with other greenthumbs to get plant advice and show off my successes on a social media site so that all the fruits of my labors and pictures of my plants are all in one place.

-   As a user I want to be able to upload a photo of my plant along with some other information describing the problem. <br/>
-   As a user I want other users to be able to comment on my post to give me feedback on what the problem might be (i.e. over-watering). <br/>
-   As a user I want to be able to see other user’s posts and leave my own comments. <br/>
-   As a user I want to be able to log into my account so that I can create a new post and then filter all the posts so I can just see just my own posts. <br/>
-   As a user I want to be able to update my posts.

<br/>

## **Instructions to Run App**

1. Enter the following command in your terminal to clone the repository

```
git clone https://github.com/alinz07/Propagatorz.git
```

2. Ensure you have Node.js installed on your machine. https://nodejs.org/en/download/
3. All NPM packages required for this application are already listed as dependencies in the root, src and client directories' package.json file. cd into each directory (root, src, client) and run the command 'npm i' in your terminal to install the packages.

```
cd <dirname>
```

```
npm i
```

4. To run the application in the dev environment, enter the following command in the root directory

```
npm run develop
```

This will start the GraphQL middleware on port 3000 and the React front end on port 3001 using the concurrently package. your front end should automatically open in your default browser upon running the develop command.

</br>

## **Screenshot**

![Screenshot](./ImagesForReadMe/homepage.png) <br/>

</br>

## **Contributors**

-   [Tony Linz](https://github.com/alinz07)
-   [Lindsey Dubnicka](https://github.com/lindseymiller2567)
-   [Cole Johnson](https://github.com/ColeVibes)
-   [Chris McLeod](https://github.com/Chris-McLeod2)

</br>

## **Credits**

-   Propagatorz Logo
    https://www.istockphoto.com/vector/dying-dry-dead-houseplant-in-a-plant-pot-flat-design-icon-isolated-on-white-gm1060392342-283437244
