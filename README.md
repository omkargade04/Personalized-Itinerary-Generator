# Personalised Travel Itinerary Generator

This is a web application that generates personalized travel itineraries based on user preferences, such as budget, interests, and trip duration. The application offers a user-friendly interface for inputting preferences and deliver detailed, dynamic itineraries tailored to individual users.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies and Libraries Used](#technologies-and-libraries-used)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
8. [Models Used](#models-used)


## Project Overview

This application provides a web interface for creating your prefered itinerary for their desired destination. It has a user friendly form to fill for preferences such as destination, duration, budget and travelers. And using this information we create a personalized itinerary for the user. Leveraged Gemini's API to generate personalized travel itinerary for the user.

## Features

- User Authentication.
- User friendly interface.
- Leveraged Gemini's API to generate personalized travel itinerary for the user
- User can view their detailed itinerary.
- User can view their created trip too.

## Technologies and Libraries Used

- **Backend**:
  - Typescript: Implemented MVC structure in OOP fashion and ensured type safety of the data using typescript.
  - Node.js: Used to setup the environment for backend.
  - Express.js: Built scalable backend server.
  - Mongo DB: Stored the user info and itinerary details using mongo database.
  - Redis: Used redis for rate limiting of creating trips.
  - Docker: Leveraged docker to containerize the application.
  - Continuous Integration(CI): Impleneted Continuous Integration pipeline for lint check and healthy build for pull request at main branch.

- **Frontend**:
  - Typescript: Ensured type safety of the data using typescript and enhances development efficiency, code quality, and maintainability.
  - Next.js: Built the entire client side and integrating backend apis using Next.js.
  - Tailwind CSS: Used tailwind css for responsive interface for across all devices.
  - Shadcn UI: Leveraged Shadcn UI library for building user friendly UI components.
  - Docker: Leveraged docker to containerize the application.
  - Continuous Integration(CI): Impleneted Continuous Integration pipeline for lint check and healthy build for pull request at main branch.

- **Models**:
  - Gemini API for generating user personalized itinerary.
  - Google Maps API for directing to specific destination location.


## Project Structure


backend/
├───.github
│   └───workflow
├───dist
│   ├───database
│   │   ├───config
│   │   └───interface
│   ├───modules
│   │   ├───itinerary
│   │   │   ├───controllers
│   │   │   ├───routes
│   │   │   └───services
│   │   ├───key
│   │   │   ├───controllers
│   │   │   ├───routes
│   │   │   └───services
│   │   └───user
│   │       ├───controllers
│   │       ├───middlewares
│   │       ├───routes
│   │       └───services
│   └───types
├───node_modules
└───src
    ├───database
    │   ├───config
    │   └───interface
    ├───modules
    │   ├───itinerary
    │   │   ├───controllers
    │   │   ├───routes
    │   │   └───services
    │   ├───key
    │   │   ├───controllers
    │   │   ├───routes
    │   │   └───services
    │   └───user
    │       ├───controllers
    │       ├───middlewares
    │       ├───routes
    │       └───services
    └───types

frontend/
├───.github
│   └───workflow
├───.next
├───api
├───app
│   ├───(auth)
│   │   ├───login
│   │   └───signup
│   └───(main)
│       ├───create-trip
│       ├───my-trips
│       └───view-trip
│           └───[tripId]
├───components
│   ├───layout
│   ├───my-trips
│   ├───ui
│   └───view-trip
├───constants
├───context
│   └───user
├───lib
├───node_modules
├───public
├───service
└───types

README.md     
        


## View website

Here is the deployed website : [Deployed Link](https://personalized-itinerary-generator.vercel.app/)<br>
Here is the deployed backend server: [Backend Link](https://personalized-itinerary-generator.onrender.com/);

## Installation

To install and run this project locally, add the following commands in your terminal, follow these steps:

1. Clone the repository from GitHub:

```bash
    `git clone https://github.com/omkargade04/Personalized-Itinerary-Generator.git`
```

2. Navigate into the project directory:

```bash
   `cd Personalized-Itinerary-Generator`
```

3. Navigate into client:

```bash
   `cd frontend`
```

4. Navigate into server:

```bash
   `cd backend`
```

## Important

5. Ensure that the version of `Node.js` and `npm` you're using is compatible with the dependencies you're installing. Some dependencies may require specific Node.js versions.
   Run the below command in **frontend** directory and **backend** directory.

```bash
   `npm install -g npm@latest`
```

6. Install `dependencies` for the frontend in **frontend** directory (assuming you have `Node.js` and `npm` installed):

```bash
   `npm install`
```

7. Install `dependencies` for the backend in **backend** directory (assuming you have `Node.js` and `npm` installed):

```bash
   `npm install`
```

8. Create a .env file in the **frontend** directory and add backend **api endpoint**:

`NEXT_PUBLIC_BASEURL`=`http://localhost:8000` (for **local** backend)

`NEXT_PUBLIC_BASEURL`=`https://personalized-itinerary-generator.onrender.com` (for **deployed** backend)

9. Create a .env file in the **backend** directory and connect your database with prisma via database url:

`PORT`=`5000` <br>
`MONGO_URL`=`mongodb+srv://<username>:<password>@cluster0.dvriq5l.mongodb.net/<db_name>` <br>
`SECRET_TOKEN`=`your-token` <br>
`REDIS_URL`=`redis://default:*************@casual-pig-60980.upstash.io:6379` <br>

10. Start the frontend and backend servers:

    **backend**: `npm run dev`<br>
    **frontend**: `npm run dev`

11. Open `http://localhost:3000` to view the application.

## Run the project via **Docker**

## Prerequisites

- Docker

## For Linux System:

To install Docker, run the following commands in your terminal:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

## Development Environment For Server

- Navigate into **backend** directory
- To get started with development first build the dev containers using the following command

```bash
docker-compose -f docker-compose.yaml build
```

- The env file being used for development is called `.env`
- Run the containers using the command

```bash
docker-compose -f docker-compose.yaml up
```

## Development Environment For Client

- Navigate into **frontend** directory
- To get started with development first build the dev containers using the following command

```bash
docker-compose -f docker-compose.yaml build
```

- The env file being used for development is called `.env`
- Run the containers using the command

```bash
docker-compose -f docker-compose.yaml up
```
