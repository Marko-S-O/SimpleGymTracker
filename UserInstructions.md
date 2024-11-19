Getting Started

**Setup Screen**

1.  **First Time Users**:
    -   You are prompted to create an account. Enter a **username** (minimum 6 characters) and a **password** (minimum 8 characters).
    -   Click **Start using** to proceed. The program creates a local and server data storage for you. Will not have to re-login in the same device.
    -   If you enter a username that already exists in the server, it is treated as an authentication attempt of an existing user.
2.  **Users with an existing account**
    -   If you are using the app in a new device for the first time, you will be prompted to log in.
    -   After a successful login, the program will retrieve your data from the server and store a local copy to the device.
    -   Login does not expire and you will not have to re-login in the same device.

Program Structure

The app consists of the following functions:

1.  **WORKOUT** tab: Track your active workout sessions in real-time.
2.  **HISTORY** tab: View and manage your past workout sessions and initialize new workouts using and old session.
3.  **PROGRAM** tab: Create, save, and manage workout programs. Initialize a new workout using one of the workouts in the program.
4.  **OLD PRS** (old programs) tab: View old programs, re-activate them and initialize a workout session from an old program.
5.  **Refresh** function: synchronized the data fed in another device to the current device.

You can switch between the tabs freely to access their respective features. The data in tabs is preserved during use of other transfers.

WORKOUT Tab

**Logging an Active Workout**

-   **Add Exercise**: Create a new exercise for your workout.
    -   You are asked to give the exercise name. You can either type the program name or select it from the list.
    -   The list includes your workout names from past workouts and programs. If needed, use refresh button in the top-right corner to fill the list of exercise names.
-   **Add Set**: Add a set to the current exercise by entering the number of reps and weight (kg). You can either type in the values or adjust the number by pressing + and - buttons. When using buttons, amount of adjustment depends on the weight.
-   **Delete Set**: Remove a set. The last set of the exercise is always removed. If you want to remove a set in the middle of exercise, you have to remove the last one and adjust the others accordingly.
-   **Delete Exercise**: Remove the exercise entirely.
-   **Save Workout**: Save the current workout. Workout will be saved to the local storage and server. If the server is not available, the workout is still saved securely in the local storage.
-   **Finish Workout**: Mark the workout as completed. The workout is moved to the history list and is available in the HISTORY tab.

HISTORY Tab

**Viewing Past Workouts**

-   Use the **Previous** and **Next** buttons to browse through past workout sessions.
-   Use **Delete** button to remove a past workout. Deleted data can’t be recovered.
-   Use **Start New** button to start a new workout and initialize it with the data of the old workout.

PROGRAM Tab

**Creating and Managing Programs**

1.  **Create a Program**:
    -   Enter a name for your program in the **Active Program** section.
    -   Use the **Add Week** button to add a new week to the program if you have a multi-week training cycle.
    -   Use **Add Workout** to define workouts for each week.
2.  **Add Exercises to Workouts**:
    -   Similar to the Workout tab, add sets, reps, and weights for each exercise.
3.  **Save Program**:
    -   Use the **Save Program** button to save your progress.
4.  **Start New**:
    -   Reset the program to create a new one. The old program will be transferred to the old programs section and an empty one is initialized.

**Editing a Program:**

-   **Add Week/Workout**: Expand the program with additional weeks or workouts.
-   **Delete Week/Workout**: Remove unwanted weeks or workouts.

OLD PRS (Old Programs) Tab

**Viewing Previous Programs**

-   Navigate through previously completed programs using the **Previous** and **Next** buttons.
-   Use **Activate** button to reactivate an old program. The current program will be transferred to the old programs list and the old program will be set to be the current active program.
-   **Delete**: Remove the program. Deleted data can’t be recovered.
-   **Start →**: You can also use the exercises of the old programs to initialize a new workout, just like workout history and the current program.

Data refresh ⟳

Data refresh is triggered by clicking the icon ⟳ in the top-right corner of the app.

**Intended use**: If a user submits data from one device and wants to make it available in another one, it needs to be made available using the data refresh. Typical use case is setting up a workout beforehand using web UI and later taking it into use in the phone at gym.

**Data merging** rules: See section Data Storage for rules of data merging between local and server storages.

Data storage

1.  **Data storage rules**: The program stores the data both locally and in the server. The following rules apply for data storage
    -   All user data is stored as a single object including: workout, workout history, program, old programs.
    -   When saving data, it is always stored similar in the local and server storages, including timestamps.
    -   The program tries to read local data first. If it is found, server data for the user is read. If no local data is available in the device, setup screen is shown to a user.
    -   Local and server data are merged
        -   If workout history or old programs lists are differing, local and server lists are combined.
        -   If there is a differing active workout or current program in the local storage and server, the newer one is selected. Data of the older one is lost.
    -   Merged data is immediately saved to both local storage and server to keep it synchronized over time.

Authentication and authorization

In setup, user gives a username and password. This information is used to create authentication information that is used authenticate server data retrieval and storage. Authentication in an individual device does not expire.

Troubleshooting

-   If you want to change to another user account in a device, you currently need to clear the app cache in Android settings or clear the data of the app in browser settings.
-   Bugs or issues can be reported to the author: marko@orasaari.com
