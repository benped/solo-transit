# Transit Timer - Solo Project

## Description

_Duration: 60 hours_

This built this app to gain foundational knowledge using React, Redux, and Sagas with External APIs and User Authentication. It uses the Metro Transit API to get bus and train times and deliver them at scheduled times to users via SMS using the Twilio API.  

[Curently Deployed Here] (https://fast-sea-09511.herokuapp.com/)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Postgresql](https://www.postgresql.org/)

## Database Setup

1. Create a database named `transit_app`
2. Run the queries from `database.sql` on the `transit_app` database

## Install Dependencies

1. `npm install`
2. `npm run start`
3. `npm run client`

## Usage
1. Register or Login to the App
2. Click on the blue + button to Add a route
3. Select your Route, Direction, and Stop
4. Select the time you want to be notified, and enter your phone number
  4a. You can test your phone number and route here
5. Finish Adding Route
6. From the Home Page you can see your added Route. You can edit details from here

## Built With 
- HTML5/CSS
- React / Redux / Sagas
- Node / Express / PostgreSQL
- Passport
- Material UI

### APIs
- [Metro Transit NexTrip](https://svc.metrotransit.org/swagger/index.html)
- [Twilio](https://www.twilio.com/)

## Screenshots
! [Home Page with selected routes in card form](./documentation/images/HomePage.png "Home page")
! [Image of Adding a Route](./documentation/images/AddRoute.png "Adding a Route's notification settings")
! [Selecting a stop from the Dropdown, inside a material UI stacker](./documentation/images/AddStop.png "Stop from the Dropdown, inside a Material UI stacker")
! [Screen for editing route notification details](documentation/images/EditRoute.png "Route notification details editor")

## Reflection
I worked to stretch my sql knowledge to make the simplest possible request to the database to get the most databack. Particularly proud I got the route parameters to work so that I can refresh and correctly load details. 
I wish I had been able to make the cards a little more dynamic, potentially a load animation and figure out how to get the images to cover the card, no matter the input size. 
Really enjoyed making the input form and having that appear and disappear using the FAB. 

## Roadmap 
- [ ] Build out email notification functionality
- [ ] Add all stops on a route, not just key junctions
- [ ] Add Google Maps API to find stops nearby


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me make this application a reality.

