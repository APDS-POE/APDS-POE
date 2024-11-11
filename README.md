# International Payment Gateway

## Description
This project is a full-stack application built with Node.js and React. It utilizes Express for the backend and communicates with a MongoDB database. The application supports user authentication, payment processing, and provides a secure HTTPS connection using mkcert-generated certificates.

## Features
- **User Authentication** using JWT for secure session management.
- **Payment Processing Capabilities** integrated seamlessly with the backend.
- **Secure Communication** over HTTPS to protect data in transit.
- **Improved Password Security** through best practices and secure hashing algorithms.
- **CircleCI Integration** for automated testing, linting, and continuous integration workflows.
- **SonarQube Code Quality Analysis** to maintain high-quality code and reduce technical debt.
- **MongoDB Database** for efficient and scalable data storage.
- Built with modern technologies like **React, Express, and Mongoose** for a responsive and robust application.

## Technologies Used
- **Frontend:**
  - React
  - Chakra UI
  - Axios
  - React Router

- **Backend:**
  - Node.js
  - Express
  - Mongoose
  - MongoDB
  - express-rate-limit (rate limiting)
  - express-brute (brute-force protection)
  - Helmet (enhanced security headers)
  - CORS (cross-origin requests)
  - dotenv (environment variable management)

- **DevSecOps:**
  - CircleCI (Continuous Integration)
  - SonarQube (Code Quality & Security Analysis)

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB 
- mkcert
- CircleCI account (for CI/CD configuration)
- SonarQube account (for code analysis)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VCWVL/apds7311-part-2-ST10019757.git
   ```

2. **Install dependencies for the backend:**
   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for the frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```plaintext
MONGO_URI=your_mongo_connection_string

```

### Running the Application

1. **Generate SSL certificates using mkcert** (if not done already):
   ```bash
   mkcert -install
   mkcert localhost
   ```

2. **Run the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

3. **Run the frontend application:**
   ```bash
   cd ../frontend
   npm start
   ```

4. **Setup CircleCI**: Follow the instructions below to configure continuous integration for your project.
   - Add your project to CircleCI and connect your repository.
   - Define a `.circleci/config.yml` file with necessary workflows, including steps for testing and SonarQube scanning.
   - CircleCI will automatically run your configured jobs upon each push to the repository.

5. **SonarQube Configuration**:
   - Ensure your SonarQube token and project key are set
   - SonarQube will run as part of the CircleCI pipeline to analyze the code for vulnerabilities, technical debt, and code quality issues.

### Accessing the Application

- **Frontend:** Open your browser and go to `https://localhost:3000`
- **Backend:** The backend API will be running at `https://localhost:5000`

## References
1. Art of Engineer (2023). Build app using React JS, Node Express JS and Mongo DB (MERN Stack). [online] YouTube. Available at: https://www.youtube.com/watch?v=mDgKjb5eWPk [Accessed 1 Oct. 2024].
2. CodeWithMasood (2023). How to integrate Stripe Payment in React and Node.js (Step by Step)! [online] YouTube. Available at: https://www.youtube.com/watch?v=3OOHC_UzrKA [Accessed 1 Oct. 2024].
3. Mahmoud - MightyTuts (2020). 01- Introduction to Chakra-ui - Chakra-ui Mini Course. [online] YouTube. Available at:https://www.youtube.com/watch?v=1kcKlOjK_L4&list=PLDIXF8nb0VG174PlQuej1su71AvR1JHo[Accessed 5 October 2024].
4. MongoDB (2024). Get Your Free MongoDB Atlas Cluster! [online] YouTube. Available at: https://www.youtube.com/watch?v=VkXvVOb99g0 [Accessed 1 October. 2024].
5. Net Ninja (2022). MERN Stack Tutorial #8 - Making a React App. [online] YouTube. Available at: https://www.youtube.com/watch?v=bx4nk7kBS10 [Accessed 1 October 2024]
6. IIEVC School of Computer Science (2024). APDS7311 - Setting up CircleCi and SonarQube. [online] YouTube. Available at: https://youtu.be/I4CyzX5rhLU?si=qBO9tFKrFzhqdfHv [Accessed 7 Nov. 2024].
7. Smurf, B. (2024). NEW 2024 React Particle JS Tutorial. [online] YouTube. Available at: https://youtu.be/AKM3EodFZek?si=9Q8z5AuWdWzSByeo [Accessed 5 Nov. 2024].
8. 
