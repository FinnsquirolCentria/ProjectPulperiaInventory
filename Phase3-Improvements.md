# Phase 3 – Extra Feature or Improvements (Optional)
## 🎯 Chosen Use Case or Feature to Improve
-   Use Case 4: Checking store status (Client perspective).
-   All the Use Cases: Added users.

## 🔍 Original Definition
Link or reference to the original use case or requirement from Phase 1.

## 🔄 Implementation
Describe what you implemented in this phase. Focus on what changed or was added:

### What technical changes were required?
1. Added a dedicated users route for the login and registration page.
2. Implemented state management using useState to toggle between login and registration forms.
3. Integrated API calls using axios to handle user login and registration with the backend.
4. Used useNavigate from react-router-dom to redirect users to the dashboard (/home) after successful login or registration.
5. Updated the Navbar component to ensure it is displayed on the users page for consistent navigation.
### What technologies, methods or structures did you use?
1. React Router:
    Used for managing routes and navigation, including the users route for login and registration and redirection to /home after authentication.
2. Axios:
    Used for making HTTP requests to the backend API for user login and registration.
3. Password Encryption:

    - bcrypt (on the backend):
        - Used to hash user passwords before storing them in the database, ensuring secure password storage.
        - During login, passwords are verified by comparing the hashed password in the database with the user-provided password.
4. JWT (JSON Web Tokens):

    - Used for user authentication and session management.
    - After successful login or registration, a JWT is generated on the backend and sent to the frontend, where it is stored in localStorage for subsequent authenticated requests.

### What challenges did you encounter and how did you solve them?
1. Challenge: Ensuring proper redirection after login and registration.

    Solution: Used useNavigate to programmatically redirect users to /home after successful authentication.
2. Challenge: Handling errors during login and registration (e.g., invalid credentials or duplicate users).

    Solution: Implemented error handling to display appropriate error messages to the user.

3. Challenge: Ensuring the Navbar is displayed consistently across pages.

    Solution: Imported and included the Navbar component in the users page layout.