# Phase 4 – Project Presentation

## 🎯 Project Title
Pulpería Inventory Management System

## 📝 Project Overview
The Pulpería Inventory Management System is designed to help small neighborhood store owners in Nicaragua manage their inventory, sales, and restocking processes. The system is tailored for low-tech users with limited budgets, providing an intuitive interface and localized features such as prices in córdobas and common product lists. 

Target users include pulpería owners and their employees, as well as customers looking for nearby stores.

## 📌 Use Case Summary

| Use Case                                      | Implemented (Yes/No) | Demonstration / Notes                                                                 |
|-----------------------------------------------|-----------------------|---------------------------------------------------------------------------------------|
| Recording a sale                              | Yes                   | Implemented with a manual sales tracking system.         |
| Checking inventory                            | Yes                   | Real-time inventory dashboard with low-stock alerts.     |
| Restock notification                          | Yes                   | Automated low-stock alerts sent to the owner.         |
| Checking store status (client perspective)    | Yes                   | Map view with nearby pulperías and product availability. |
| Generating sales reports                      | Yes                   | Reports with sales trends, best-selling products, and export options.|

## ✍️ Technical Implementation
- **Frontend**: Built with React.js and styled using CSS. Used `react-leaflet` for map integration.
- **Backend**: Developed with Node.js and Express.js. Sequelize ORM was used to interact with a MySQL database.
- **Database**: MySQL database stores product, sales, and user data.
- **Key Features**:
  - **Sales Tracking**: Manual sales input with automatic stock updates.
  - **Inventory Management**: Real-time inventory dashboard with low-stock alerts.
  - **Map Integration**: Displays nearby pulperías using GPS and OpenStreetMap.
  - **Reports**: Generates sales reports with export options (CSV).

## 🚂 Development Process
1. **Phase 1**: Defined use cases and user flows.
2. **Phase 2**: Built the basic structure, including login and inventory management.
3. **Phase 3**: Added advanced features to sales reports, polished previous features and added a new functionality.
4. **Phase 4**: Finalized the project, added map integration, and prepared the presentation.

Key decisions:
- Focused on simplicity for low-tech users.
- Prioritized features like inventory tracking and sales reports over advanced analytics.

## ☀️ Reflection and Future Work
### What Worked Well
- The map integration with `react-leaflet` provided a user-friendly way to locate nearby pulperías.
- The low-stock alert system was effective and easy to implement.

### Challenges
- Implementing users.
- Optimizing the backend API for faster responses.

### Future Improvements
- Add a barcode scanner for faster sales input.
- Implement a mobile app version for better accessibility.
- Enhance the reporting system with more visualization options.

## 📊 Work Hours Log

| Date  | Used hours | Subject(s) |  outcome |
| :---  |     :---:      |     :---:      |     :---:      |
| 20.3.2025 | 1 | Planning the phase 1  | Defined User Personas  |
| 21.3.2025 | 2 | Planning the phase 1  | Defined User Cases and Flows  |
| 21.3.2025 | 3.5 | Planning the phase 1  | UI Prototype |
| 22.3.2025 | 2 | Planning the phase 1  | Defined Information architecture and Technical Design  |  
| 22.3.2025 | 2 | Planning the phase 1  | Project management and user testing |
| 5.4.2025 | 5 | Backend development  | Created the backend server  |  
| 5.4.2025 | 4 | Frontend development  | Added basic functionalities to test the connection wit the backend |
| 7.4.2025 | 6 | Backend poulishing | Added and poulished functionalities |  
| 8.4.2025 | 7 | Frontend development  | Added more functionalities and poulished |
| 13.4.2025 | 3 | Testing  | Added more functionalities and poulished |
| 14.4.2025 | 4 | Changed things based on tests  | Added more functionalities and poulished |
| 22.4.2025 | 4.5 | Polished existing features  | Polished features |
| 23.4.2025 | 8 | Added pulperia location feature  | Added more functionalities |
| 24.4.2025 | 2 | Solved error to filter correctly by day, week, month, year  in the sales summary | Corrected errors |
| 24.4.2025 | 2 | Additional feature for sales report | added features |
| **Total**  | 56h  |                                       |

## 🪢 Presentation Link
Live presentation