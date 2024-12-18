# Getting Started

**Setup Screen**

1.  **First Time Users**:
    -   You are prompted to create an account. Enter a **username** (minimum 6 characters) and a **password** (minimum 8 characters).
    -   Click **Start using** to proceed. The program creates a local and server data storage for you. Will not have to re-login in the same device.
    -   If you enter a username that already exists in the server, it is treated as an authentication attempt of an existing user.
2.  **Users with an existing account**
    -   If you are using the app in a new device for the first time, you will be prompted to log in.
    -   After a successful login, the program will retrieve your data from the server and store a local copy to the device.
    -   Login does not expire and you will not have to re-login in the same device.

**Please notify** that the response to “Start using” button may take a while because of the characteristics of the used cloud server. After the initial setup, this will have no impact on responsiveness.

# Program Structure

The app consists of the following functions:

1.  **WORKOUT** tab: Track your active workout sessions in real-time.
2.  **HISTORY** tab: View and manage your past workout sessions and initialize new workouts using and old session.
3.  **PROGRAM** tab: Create, save, and manage workout programs. Initialize a new workout using one of the workouts in the program.
4.  **OLD PRS** (old programs) tab: View old programs, re-activate them and initialize a workout session from an old program.
5.  **Refresh** function: synchronized the data fed in another device to the current device.

You can switch between the tabs freely to access their respective features. The data in tabs is preserved during use of other tabs.

# WORKOUT Tab

**Logging an Active Workout**

-   **Add Exercise**: Create a new exercise for your workout.
    -   You are asked to give the exercise name. You can either type the program name or select it from the list.
    -   The list includes your workout names from past workouts and programs.
-   **Add Set**: Add a set to the current exercise by entering the number of reps and weight (kg). You can either type in the values or adjust the number by pressing + and - buttons. When using buttons in the weight field, amount of increment/decrement depends on the weight.
-   **Delete Set**: Remove a set. The last set of the exercise is always removed. If you want to remove a set in the middle of the list, you need to remove the last one and adjust the others accordingly.
-   **Delete Exercise**: Remove the exercise entirely.
-   **Save Workout**: Save the current workout. Workout will be saved to the local storage and server. If the server is not available, the workout is still saved securely in the local storage and synchronized to the server later.
-   **Finish Workout**: Mark the workout as completed. The workout is moved to the history list and can be found in the HISTORY tab.

# HISTORY Tab

**Viewing Past Workouts**

-   Use the **Previous** and **Next** buttons to browse through past workout sessions.
-   Use **Delete** button to remove a past workout. Deleted data can’t be recovered.
-   Use **Start New** button to start a new workout and initialize it with the data of the old workout.

# PROGRAM Tab

**Creating and Managing Programs**

-   **Create a Program:**
    -   Enter a name for your program in the program header section.
    -   Use the **Add Week** button to add a new week to the program if you have a multi-week training cycle.
    -   Use **Add Workout** to define workouts for each week.
-   **Add Exercises to Workouts:** Add sets, reps, and weights for each exercise. Submitting data for an individual exercise is similar to the WORKOUT tab.
-   **Save Program:** Use the **Save Program** button to save the program.
-   **Start New:** Start a new program. The current active program will be transferred to the old programs section and an empty one is initialized.
-   **Delete Week/Workout:** Remove unnecessary weeks or workouts with the corresponding buttons.

# OLD PRS (Old Programs) Tab

**Viewing Previous Programs**

-   Navigate through previously completed programs using the **Previous** and **Next** buttons.
-   Use **Activate** button to reactivate an old program. The current program will be transferred to the old programs list and the old program will be set to be the current active program.
-   **Delete**: Remove the program. Deleted data can’t be recovered.
-   **Start →**: You can also use the exercises of the old programs to initialize a new workout, just like in the workout history and the current program.

# Data refresh ⟳

Data refresh is triggered by clicking the icon ⟳ in the top-right corner of the app.

**Intended use**: If a user submits data from one device and wants to make it available in another one, it needs to be done using the data refresh. Typical use case is setting up a workout beforehand in the web UI and later taking it into use in a phone at gym.

**Data merging** rules: See section Data Storage for rules of merging local and server data.

# Data storage

**Data storage rules**: The program persists the data both locally and in the server. The following rules apply for data storage:

-   All user data is stored as a single entity including: workout, workout history, program, old programs.
-   When saving the data, it is always stored similar in the local and server storages, including timestamps.
-   The program tries to read the local data in the device first. If found, server data for the user is read. In case no local data is available in the device, the setup screen is shown to the user.
-   Local and server data are merged
    -   If workout history or old programs lists are differing, local and server lists are merged. Duplicate copies are removed.
    -   If there is a differing active workout or current program in the local storage and server, the newer one is selected. Data of the older one is lost.
-   Merged data is immediately saved to both the local storage and server to keep it synchronized over time.

# Security

**The app is not intended to store personal or sensitive data.** Never submit such information in the system and use an anonymous username in the account setup.

The server communication is secured by using an https connection and token-based authentication.

# Troubleshooting

-   If you want to change to another user account in a device, you currently need to clear the app cache in Android settings or clear the data of the app in browser settings.
-   Bugs or issues can be reported to the author: marko@orasaari.com
