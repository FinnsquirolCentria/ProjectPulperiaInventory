# Project Phase 2 - Basic Structure and Main Functionalities

## 1. Environment
- **Backend**: Node.js with Express.js for API development.
- **Frontend**: React.js for building the user interface.
- **Database**: MySQL database using Sequelize ORM.
- **Environment Variables**: Managed using `.env` file for sensitive data like database credentials.

### Dependencies:
- **Backend**: `express`, `sequelize`, `mysql2`, `dotenv`, `cors`, `body-parser`.
- **Frontend**: `react`, `react-router-dom`, `axios`, `chart.js`.

---

## 2. Backend

### Structure:
- `models/`: Contains Sequelize models for `Product`, `Sale`, and `Alert`.
- `routes/`: Contains API routes for products.
- `config/`: Contains database configuration.
- `server.js`: Main entry point for the backend server.

### Features:
- CRUD operations for products and sales.
- Dashboard endpoints for sales summary, low stock alerts, and top-selling products.
- Error handling for API routes.
- Database synchronization using Sequelize.

---

## 3. Frontend

### Structure:
- `src/components/`: Contains reusable components like `Sidebar`.
- `src/pages/`: Contains pages for `Home`, `Products`, `Sales`, and `Reports`.
- `App.jsx`: Main application file with routing.
- `main.jsx`: Entry point for rendering the React app.

### Features:
- Responsive design with a sidebar for navigation.
- Pages for managing products, recording sales, and viewing reports.
- Interactive charts for sales summary using `chart.js`.
- Form validation for adding products and sales.

---

## 4. Database

### Tables:
- `products`: Stores product details like name, stock, price, and category.
- `sales`: Stores sales records with product references, quantity, and total price.
- `alerts`: Stores low stock alerts with product references and status.

### Relationships:
- `Product` has many `Sale` and `Alert`.
- `Sale` belongs to `Product`.
- `Alert` belongs to `Product`.

### Configuration:
- Database connection managed using Sequelize.
- Environment variables for database credentials.

---

## 5. Basic Structure and Architecture

### Backend:
- Follows MVC architecture with models, routes, and controllers.
- Modularized code for scalability and maintainability.

### Frontend:
- Component-based architecture for reusability.
- State management using React hooks (`useState`, `useEffect`).

### API:
- RESTful API design with endpoints for products, sales, and dashboard data.

---

## 6. Functionalities

### Products:
- Add, update, delete, and view products.
- Low stock alerts based on a threshold.

### Sales:
- Record sales with automatic stock updates.
- View and delete sales records.

### Home (Dashboard):
- Sales summary with filtering by day, week, month, or year.
- Top-selling products.
- Interactive charts for revenue visualization.

### Reports:
- View detailed sales reports with product and revenue data.

---

## 7. Code Quality and Documentation

### Code Quality:
- Follows best practices for clean and readable code.
- Consistent naming conventions and modular structure.

### Documentation:
- Inline comments for complex logic.
- API documentation for backend routes.
- README file with installation and usage instructions.

---

## 8. Testing and Error Handling

### Backend:
- Error handling for database operations and API routes.
- Validation for request payloads.

### Frontend:
- Form validation for user inputs.
- Error messages for failed API requests.

### Testing:
- Testing CRUD with POSTMAN 
- Unit tests for backend routes (to be implemented in the next phase).

---

## 9. User Interface and Interaction

### Design:
- Clean and responsive UI with a sidebar for navigation.
- Forms for adding products and sales.
- Tables for displaying products and sales data.

### Interaction:
- Dropdowns and input fields for user inputs.
- Buttons for actions like adding, updating, and deleting records.
- Charts for visualizing sales data.

## 10. Backend API Endpoints

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

## 11. Testing Cases

### Backend API Testing

#### Products API
- **Fetch All Products**: Ensure all products are returned.
- **Add a New Product**: Verify a new product is added successfully.
- **Update Product Stock**: Confirm stock updates are reflected in the database.
- **Delete a Product**: Ensure the product is removed from the database.

#### Sales API
- **Fetch All Sales**: Verify all sales are returned with product names.
- **Add a New Sale**: Confirm a new sale is recorded and stock is updated.
- **Delete a Sale**: Ensure the sale is removed from the database.

#### Dashboard API
- **Fetch Sales Summary**: Verify sales summary data is grouped by product.
- **Fetch Low Stock Alerts**: Confirm low stock alerts are generated correctly.
- **Fetch Top-Selling Products**: Ensure top-selling products are returned.

#### Reports API
- **Fetch Sales Reports**: Verify detailed sales reports are accurate.

---