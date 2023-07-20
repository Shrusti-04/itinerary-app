# Itinera

![Itinera Logo](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/logoWText.png)


<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About

Itinera is a travel itinerary generator that allows users to build their ideal vacation, and get an AI generated daily itinerary in seconds.

They can set their trip name, destination, dates and budget, and then collaborate with friends to decide the locations and activites they want to hit. Once they're happy with their trip they hit 'Generate itinerary' and they're presented with a full day-by-day itinerary, using their input plus other attractions, restaurants, cultural landmarks, travel suggestions etc.

**Example:**

![Itinerary being generated](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/slow.gif)

## Website

![Desktop and Mobile experience](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/desk-mob.png)

### Built With

For this project we were tasked to build a fullstack application using these tools:


![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Usage

- Bullet steps explaining how to use the app

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Project Brief

- Have at least 2 data entities in addition to the User Model - one entity that represents the main functional idea for your app and another with a One:Many or Many:Many relationship with that main entity.
- Use OAuth authentication.
- Implement basic authorization that restricts access to features that need a logged in user in order to work
- Have full-CRUD data operations somewhere within the app's features.
- Have a consistent and polished user interface.
- Be deployed online via Heroku

## Planning

**Aim:**

To build a fullstack web application using JS, Express, Node, MongoDB and Mongoose. The app will be based around travel.

**Landing Page:**

Users can read about what the app does and there’s a button to ‘Plan Trip’.

- **Trip Creator**
Users can create a new trip by adding to a form:

  - A location
  - A start and end date
  - Other users they'd like to plan with (optional).
  - When they hit the ‘Create Trip’ button they are prompted to sign in.

- **Oauth/Login Modal**
If a logged out user hits create trip they’re prompted to sign/up or login, via a modal that uses google 0auth

- **Trip Builder**
Then there will be a trip screen where users can see the trip information:
  - They can add activities, locations and restaurants they'd like to visit.
  - There'll be a budget slider, and the ability to amend the dates too.
  - Once they have all of this data and they're happy with the trip they can click 'Generate Itinerary) and I will use the OpenAI API to use a prompt to request it make a table itinerary based on the budget, location, dates, activities etc. and serve that back to me and I'll format it and share with the users.
  - The user can export the itinerary
   - The user can then amend or regenerate the itinerary until they’re happy.
  - There will be an invite collaborators button and form

- **Profile Page**
The user will have a profile page where they can see all of their past Trips and click into the Trip Builder page for any of them.

## ERD

![Itinera ERD Diagram](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/itinera-ERD.jpeg)


## Wireframe

**Home Page:**

![Itinera Home Page](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/home-page.png)

**New Trip:**

![New Trip page](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/new-trip.png)

**0Auth Modal:**

![0Auth Modal](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/0Auth-modal.png)

**Trip Planner:**

![Trip Planner page](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/trip-planner.png)

## Inspiration

While researching existing solution in the market I found the website, Wanderlog. It allows users to create and collaborate on trips with friends. I loved their clean design, and the'd recently implemented an AI chat function, but not a way to generate an itinerary.

![Wanderlog home page](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/wanderlog.png)

![Wanderlog new trip page](https://github.com/SimpsonRoss/itinerary-app/blob/main/public/images/wanderlog2.png)

## MVP - Minimum Viable Product

- [x] A way to login so that I can track my trips
- [x] A way to log all the activities and locations for a trip
- [x] The ability to delete activities or locations in my trip
- [x] A way to specify the start and end date of the trip
- [x] A way to Specify a budget for the trip
- [x] A place to track the trips I own and collaborate on.

## NTH - Nice to have

- [x] AI generates the itinerary for my trip.
- [x] I can invite friends to collaborate on a trip.
- [] The site features a map, showing my travel locations
- [] The locations search autocompletes via Google Place API.
- [] I get contextual suggestions for locations and activites.


## Biggest Challenge

The toughest part of this project for me was working with the OpenAI API for the first time, and learning how to use detailed prompts to get somewhat standard, parsable data back in return.

-**OpenAI is non-deterministic**, so when I asked it the same question over and over again I'd get a different result each time. Each time the formatting would be different and it wasn't conducive with creating a polished app.
-**Building strong prompts is key.** I had to learn how to build very clear prompts that left little room for error, and would almost always return an output in a format I could anticipate and parse for displaying in HTML. 
-**Adding template literals into prompts.** Once I had the output more consistent I began tweaking the input, swapping out constants for template literals and making the itineraries specific for the trip in question.

If I was releasing this to the market this would be an area that I'd invest a lot more time in, building more safeguards using regular expressions to ensure that the itinerary is correct before dislaying it to the user.


## User Feedback

- [x] Make the trip name and location editable
- [x] Add a section where you can see the trips you're collaborating on with friends
- [] More clear messaging around the Trip planner CRUD UI, to assist the user journey
- [] If a user tries to add a guest that isn't signed up, then we email them an invite link
- [] Add other authorisation methods
- [] Add some keyword buttons a user can click to assist the AI with the trip's 'vibe'


## Next Steps

- Add Google's Places API to help autocomplete locations
- Standardise CSS styling across the site
- Add more safeguards to ensure that AI responses are consistent
- Update the OpenAI API to stay current. Currently I'm using *text-davinci-003* but I'm hoping they release *text-davinci-004* and I can utilise ChatGPT-4's capabilities.


## Wins

- **Getting the API working**. This was only the second time I've worked with third party APIs, and at the start of the project it seemed like a pipe-dream to add OpenAI's functionality into my product, but I'm glad I got it working and got some experience working with something that's so popular right now. 
- **Creating an app people want to use.** I wanted to make something that highlighted the topics I'm learning, and satisfies the project brief, but also something that I'd use and others want to use. From user feedback it seems that I achieved this, and that feel's awesome.

## Mistakes / Bugs

- **Becoming beholden to bootstrap**. I got so tied into bootstrap early on, that when it came to implementing custom CSS it made it much harder. Overall though for time spent, bootstrap was brilliant.
- **Messing up my routing in Heroku / Google 0Auth** I sank 6 hours into Heroku and Google 0Auth debugging only to realise I’d missed the /oauth2callback tail from my authorised redirect URI in Google Cloud.
- **Discrepancies in UI styling across pages** I threw a lot of CRUD functionality at the trips show page, and consequently didn’t have enough time to fully style how I wanted it


## Key Learnings

- **Open AI API isn't suitable for a Free model**, unless supported by adverts. I spent 3 dollars just testing it by myself, so if I had hundreds/thousands of users generating itineraries every day I'd be in financial ruin.
- **Stick to the MVC pattern**, at one point I was stuck and decided to us a main.js file to add some code and get things working quickly, but later on it became apparent I'd need to instead include it in my controllers and it took me hours to break it down into MVC pattern. In hindsight I should stuck to the pattern.
- **Debug the basics before getting in the weeds**, I had an issue with getting Google 0Auth to work when deployed to Heroku. I spent 5-6 hours debugging it, reading documentation and logs. Only to find out it a redirect URL I'd formatted incorrectly in my Client ID, that took 5 seconds to alter.
- **Don’t skimp on wireframing**, I managed to include some nice-to-have features in my site, but at the time of wireframing I thought I was being overly optimistic including them. As a consequence my UI on the Trip planner page suffered and became a bit of a Frankenstein's monster.

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Ross Simpson - [My LinkedIn](https://www.linkedin.com/in/simpsonre/) - thisisrosssimpson@gmail.com

Project Link: [https://github.com/SimpsonRoss/itinerary-app](https://github.com/SimpsonRoss/itinerary-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These resources helped me greatly in the completion of my game, especially when it came to CSS styling and creating animated loops for my little alien mascot.

- [CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [htmlcheatsheet.com](https://htmlcheatsheet.com/)
- [Img Shields](https://shields.io)
- [Trello] (https://trello.com/)
- [GitHub Pages](https://pages.github.com)
- [Photopea](https://www.photopea.com/)
- [EZ gif](https://ezgif.com/)
- [Animated Drawings](https://sketch.metademolab.com/canvas)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
