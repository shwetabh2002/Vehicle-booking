# Vehicle booking App

This is a web application built with Express.js and MongoDB to register vehicle details. It allows users to enter their personal information, select the number of wheels, vehicle type, and date range. The entered data is then saved to a MongoDB database.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- MongoDB
- ejs
- nodemon (so that you do not need to ren the server again and again)

## Getting Started

 Clone the repository:

Navigate to the project directory:


Copy code
cd vehicle-registration-app
Install the dependencies:


Copy code
npm install
Set up the MongoDB connection:

Open the app.js file.
Replace the MongoDB connection string (mongodb+srv://...) in the mongoose.connect() method with your own MongoDB connection string.
Start the application:

bash
Copy code
npm start
Access the application in your browser at http://localhost:3000.

Usage
Open your browser and go to http://localhost:3000.
Fill in the required information on each page and click the "Next" button to proceed to the next step.
Once you reach the "Select Date" page, choose a start date and end date for the vehicle registration.
Click the "Submit" button to save the details.
You will see a success message if the details are saved successfully.
Error Handling
If any errors occur during the registration process, an error page will be displayed, indicating the error and providing guidance on how to handle it.

Dependencies
The following dependencies are used in this project:

express: Fast, unopinionated, minimalist web framework for Node.js
mongoose: MongoDB object modeling tool
body-parser: Node.js body parsing middleware
