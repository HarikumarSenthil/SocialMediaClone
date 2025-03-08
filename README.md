# Social Media Feed

## Overview
This is a simple social media feed application that allows users to register, log in, create posts, like/unlike posts, and add comments. Users can also sort posts based on popularity and view their own posts separately. The project utilizes React for the frontend, Node.js with Express.js for the backend, and MySQL for persistent data storage.

## Features
- **User Authentication**: Registration and login functionality.
- **Post Feed**: Displays a list of posts with user details, post content, likes, and comments.
- **Like/Unlike Posts**: Users can like or unlike posts by clicking the "Like" button.
- **Commenting**: Users can add and view comments on posts.
- **Create Posts**: Users can create and add new posts to the feed, including image uploads.
- **Sorting & Filtering**:
  - Sort posts based on popularity (likes/comments).
  - Display a user's own posts separately.
- **React State Management**: Utilizes React state to manage posts, likes, and comments dynamically.

## Technology Stack
### Frontend
- **React.js**: Core frontend framework.
- **Material-UI (MUI)**: Used for styling and UI components.

### Backend
- **Node.js & Express.js**: REST API development.

### Database
- **MySQL**: Stores user details, posts, likes, and comments persistently.

## Installation & Setup
### Prerequisites
- Node.js installed
- MySQL installed and configured



`. **Backend Setup**
   ```sh
   cd backend
   npm install
   ```
   - Create a `.env` file in the backend directory and configure database credentials.
   - Run the database migrations.
   ```sh
   npm run migrate
   ```
   - Start the backend server.
   ```sh
   npm start
   ```

3. **Frontend Setup**
   ```sh
   cd ../frontend
   npm install
   npm start
   ```
This will launch the React frontend at `http://localhost:3000`.


## Future Enhancements
- Implementing user profiles.
- Real-time updates using WebSockets.
- Adding more sorting and filtering options.
- Enhancing UI/UX with additional animations and themes.

## License
This project is open-source and available under the MIT License.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

Happy coding! 🚀
