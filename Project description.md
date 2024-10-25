# Overview

SimpleGymTracker is a user-friendly app designed to track workouts and make use of past workouts or programs for easy planning and tracking. The app prioritizes simplicity and usability in a real gym setting, even if that means limiting versatility or features for the sake of ease of use.

The app uses both native Android and web browser interfaces. The native app maximizes usability at gym while the web interface can be used in a big display at home to comfortably set up a program or prepare the next workout.

# Motivation

I have been working out in gym for several decades even if not too seriously. I have tried to find a suitable gym tracker app to track my workouts but all have been some way flawed for my purposes. Usually, the problems lie in simplicity and ease of use at real gym environment; when you are trying to be versatile and everything for everybody you end up being not a great solution for anyone. As a workaround, I have ended up using excel sheets which work but are far from ideal. Now that my son has joined me in gym workouts, I see an even greater need for a simple, effective workout tracker. This course is my great opportunity to create a solution that meets my personal needs and priorities.

# Key features

-   Easy, real-time workout tracking using the native Android app
-   Simple initialization of workouts based on previous workouts or saved programs
-   Convenient program setup and workout preparation at home on a large screen
-   Dual interfaces: native Android app and web browser UI
-   Offline functionality, allowing use in gyms without internet connectivity

# Technology stack

-   **Front-end**: React Native with Expo, which will also be used to create the browser UI.
-   **Back-end**: JavaScript & Node.js. As time permits, I may explore AWS Lambda for backend functions.
-   **APIs**: REST API communication between the front-end and back-end.
-   **Database**: MongoDB. If a relational database proves more suitable as the project progresses, I’ll consider switching.

# Development tools

-   **IDE**: VSCode with necessary plugins
-   **Emulators**: Android Studio
-   **Database**: Dockerized MongoDB for the development environment
-   **GitHub co-pilot:** planned to be utilized for productivity as well as learning experience

Functionality

Initial functionality is divided into epics and corresponding user stories. A HTML prototype (available in GitHub) is used to refine ideas and plan the app structure but it’s not supposed to be used as a basis of the implementation as such.

**Epic 1. Track workout**

*Story 1.1.* Add a new exercise to workout

*Story 1.2.* Delete an exercise

*Story 1.3.* Add a new set to an exercise

*Story 1.4.* Delete a set

*Story 1.5.* Save the workout

**Epic 2. Browse past workouts**

*Story 2.1.* Show past workouts

*Story 2.2.* Navigate to next / previous workouts

*Story 2.3.* Clone a workout to initialize the current session

**Epic 3. Plan program**

*Story 3.1.* Add a week

*Story 3.2.* Add a workout day to a week

*Story 3.3.* Add an exercise to a day

*Story 3.4.* Save the program

**Epic 4. Browse past programs**

*Story 2.1* Show past programs

*Story 2.2.* Navigate to next / previous programs

*Story 2.3.* Clone a program to create a new program
