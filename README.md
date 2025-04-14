# Pulpería Inventory Management System

A complete inventory management system for a pulpería (small store), built with **Node.js**, **Express**, **React**, and **MySQL**. This system allows you to manage products, record sales, monitor low stock alerts, and visualize sales data through interactive charts.

---

## Features

### Backend
- **CRUD Operations**:
  - Manage products and sales.
- **Dashboard Endpoints**:
  - Sales summary.
  - Low stock alerts.
  - Top-selling products.
- **Database**:
  - MySQL database with Sequelize ORM.
- **Error Handling**:
  - Handles database and API errors gracefully.

### Frontend
- **Responsive UI**:
  - Built with React.js.
- **Interactive Charts**:
  - Visualize sales data using `chart.js`.
- **Pages**:
  - Dashboard, Products, Sales, and Reports.
- **Form Validation**:
  - Ensures proper user input.

---

## Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **MySQL** (v8 or higher)
- **npm** (comes with Node.js)

### Clone the Repository
```bash
git clone https://github.com/FinnsquirolCentria/ProjectPulperiaInventory.git
cd ProjectPulperiaInventory
```
### Backend Setup
1. Navigate to the backend folder:
```bash
cd backend
```
2. Install dependecies:
```bash
npm install  express sequelize mysql2 dotenv cors body-parser
```
3. Create a .env file in the backend folder:
```bash
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
DB_HOST=localhost
DB_PORT=3306
PORT=5000
```
4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install react react-router-dom axios chart.js
```

3. Start frontend development server:
```bash
npm run dev
```

---

## Usage

### Access the Application
1. Open your browser and navigate to:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

### Pages
- **Dashboard**:
  - View sales summary, low stock alerts, and top-selling products.
- **Products**:
  - Add, update, delete, and view products.
- **Sales**:
  - Record sales and view sales history.
- **Reports**:
  - View detailed sales reports.

---

## Project Structure

### Backend
-   backend
    -   config/database.js
    -   models
        -   Alert.js
        -   index.js
        -   Product.js
        -   Sale.js
    -   routes
        -   product.js
-   .env
-   server.js

### Frontend

-   frontend
    -   public/icons
    -   src
        -   components/Sidebar.jsx
        -   pages
            -   Home.jsx
            -   Products.jsx
            -   Reports.jsx
            -   Sales.jsx
        -   App.css
        -   App.jsx
        -   main.jsx
-   index.html

---

## API Endpoints

### Products API
- **GET** `/api/products`: Fetch all products.
- **POST** `/api/products`: Add a new product.
- **PUT** `/api/products/:id`: Update product stock by ID.
- **DELETE** `/api/products/:id`: Delete a product by ID.

### Sales API
- **GET** `/api/sales`: Fetch all sales.
- **POST** `/api/sales`: Add a new sale.
- **DELETE** `/api/sales/:id`: Delete a sale by ID.

### Dashboard API
- **GET** `/api/sales/summary`: Fetch sales summary grouped by product.
- **GET** `/api/products/low-stock`: Fetch low stock alerts.
- **GET** `/api/products/top-selling`: Fetch top-selling products.

### Reports API
- **GET** `/api/sales/reports`: Fetch detailed sales reports.

---

## Testing

### Backend
- Use **Postman** to test API endpoints.
- Example:
  - **GET** `/api/products`: Fetch all products.
  - **POST** `/api/products`: Add a new product.

### Frontend
- Manually test the UI by interacting with the application in your browser.
- Verify:
  - Products can be added, updated, and deleted.
  - Sales can be recorded and viewed.
  - Dashboard charts display correct data.

---

## Debugging Tips
- **Backend**:
  - Check the terminal for errors.
  - Use `console.log` for debugging.
- **Frontend**:
  - Open the browser console for errors.
- **Database**:
  - Use a MySQL client to verify data.

---