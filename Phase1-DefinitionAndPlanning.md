# Project phase 1 - Definition and planning

This is focused on defining the foundation of a pulpería inventory management system. Pulperías are neighborhood stores owned
by a single person, and there are plenty of them around Nicaragua.

There are inventory management systems available online already, but most of them are designed for retailers and wholesalers.
My idea is to create something that is tailored specifically for pulperías, some differences that could solve the situation:

**Low-tech users** -- The pulpería owners are not known for being tech-savvy, as a matter of fact, most of them are still using a
notebook or paper to keep track of their inventory or what they need from the supplier, so an intuitive system that is 
as simple as possible would be necessary.

**Limited budgets** -- Most of the platforms available online charge a monthly fee. A free version with ads or a low-cost version 
could make it more accessible for the owners.

**Manual sales tracking** -- As mentioned before, most of pulpería owners keep track of the inventory manually, they don't have a
POS system. This new system could track sales manually, but still provide insights. A barcode scanner app could be implemented 
in a future also.

**Localized needs** -- Features are tailored based on Nicaragua, some examples are: prices in córdobas, common product lists,
supplier recommendations, pending payments (Pulpería owners are also known for lending money or give the product with the
option to pay later), etc.

## 1. User Personas

- Marta, the Pulpería owner
    - Owns a small pulpería.
    - Needs an easy way to track stock levels.
    - Wants to know which products sell the most.
    - Struggles with manual inventory tracking.

- Carlos, an employee
    - Works at the pulpería and helps with sales.
    - Needs a quick way to update sold items.
    - Wants a simple interface to avoid confusion.

- Supplier (Optional Future Persona)
    - Provides stock to pulperías.
    - Could benefit from knowing when restocking is needed.

- Client (Optional Future Persona)
    - Purchases products from the Pulpería.
    - May value features like tracking available products or placing orders.
    - Would benefit from a map showing the pulpería's real-time status.

## 2. Use Cases and User Flows

### Use case 1: Recording a sale
1. The owner or employee opens the system on their device. 
2. The system prompts them to enter their login credentials (username and password)
3. The system validates the provided information.
    - If valid, the user is granted access to the dashboard.
    - If not, an error message is displayed, and the user is asked to re-enter the credentials.
4. Once logged in, the user navigates to the "Record a Sale" section.
5. User select the product from a dropdown menu or type in the product name.
6. User input the quantity sold and the price per unit (or confirm pre-filled pricing information).
7. The system calculates the total for the sales and updates:
    - The stock level for the product chosen.
    - Overall sales data and analytics.
8. Confirmation message.
### Use case 2: Checking inventory
1. The owner is already logged in.
    -If not, it follows the steps from 1 to 3 from before.
2. The owner navigates to the "Inventory" section from the main menu or dashboard.
3. The inventory dashboard is displayed, showing:
    - A list of all the products in stock.
    - Real-time low-stock alerts.
    - Summary of sales trend, recent sales activity.
4. The owner makes an informed decision based on the information shown.

### Use case 3: Restock Notification
1. The system does continous monitoring of the inventory levels.
2. It detects that a product has reached a predefined low-stock threshold.
3. The system generates and automated alert containing the details about the product and the current stock level.
    - Alert sent to the owner via the chosen notification method.
4. The owner receives the alert and opens the system to review the low-stock notification.
5. The system provides suggestions or reports to help to make a decision.
6. The owner uses the information to decide whether to restock the product or wait.     

### Use case 4: Checking Store Status (Client Perspective)
1. The client launches the system on their device.
2. The app shows a home screen with a search feature or map view.
3. The client enter their location or allows the app to detect their location automatically via GPS.
4. The system displays a map with nearby pulperías, displaying the location and status.
    - Additional details could be displayed, like the pulperia's product availability.
5. The client checks the map and the detailed information of the pulperia.
6. The client plans the visit based on the provided information and client needs.

### Use case 5: Generating Sales Reports
1.  The owner logs into the system.
    - If not already logged in, they follow the login steps outlined in Use Case 1.
2. The owner navigates to the "Reports" section from the dashboard or menu.
3. The system shows a variety of report options like:
    - Daily, weekly, monthly, annually or a custom date.
    - Performance analytics for an specific product.
    - Sales trend over time comparative.
4. The owner selects the timeframe for the report.
5. The system compiles and generates the requested report, displaying metrics like: 
    - Total sales volume and revenue.
    - Best-selling products.
    - Underperforming products and categories.
6. The system provides a visualization tool like pie charts, bar charts, tables, etc to make it easier to interpret.
7. The owner checks the data and makes a decision based on it.
8. The report can be saved, printed or exported.


## 3. UI Prototypes

### [Figma - Login and Home Dashboard prototype](https://www.figma.com/design/wYEhgHIKipCAC5AfGXA1rV/Untitled?node-id=0-1&t=r5ik5K9QprlwoLol-1)

## 4. Information Architecture and Technical Design

| Component  | Technology | Why | 
| :---  |     :---:      |     :---:      |
| Frontend | React.js(Vite) | Fast and responsive UI with a component based structure |
| Backend | Node.js(Express.js) | Lightweight, scalable, easy REST API setup  |
| Database | MySQL (Sequelized ORM) | Structured and good scalability |
| Hosting| Vercel(frontend) + Render(Backend) + Planetscale(Database) + Squarespace (Domain) | Easy deployment & performance |
| Authentication | JWT | Secure sessions |

### Database schema

- User: ID, Name, Role, Email, Password
- Products: ID, Name, Stock, Price, Category, RestockThreshold
- Sales: ID, ProductID, Quantity, TotalPrice, Date
- ALerts: ID, ProductID, Message, Status, Date 


## 5. Project Management and User Testing

### Project Management tools

- Trello: Task management
- Figma: UI/UX Design

#### Phases

- Research and planning
- Design and prototyping
- Development
- Testing and optimization
- Deployment and feedback

### Testing Methods

- Unit Testing: Check small parts of code using Jest.
- Integration Testing: Ensure proper communication between Backend and Frontend by testing Enpoints using Postman.
- Usability Testing: Make sure that the owners are able to use it as expected without complication by asking them to test it and give feedback.
- Security Testing: Ensuring that the data is safe by conducting a test for SQL injection and authentication issues.

#### Test Scenarios for Use Case 1: Recording a Sale
1. Login Validation:

    - Scenario: Input valid username and password.

    - Expected Result: User gains access to the dashboard.

    - Scenario: Input invalid credentials.

    - Expected Result: Error message prompts re-entry of credentials.

2. Sale Recording Process:

    - Scenario: Select a product, enter quantity, and confirm pricing.

    - Expected Result: System calculates the total, updates stock level, and displays confirmation.

3. Edge Case:

    - Scenario: Input negative quantity or invalid pricing.

    - Expected Result: Error message indicating invalid input.

#### Test Scenarios for Use Case 2: Checking Inventory
1.  Inventory Dashboard Display:

    - Scenario: Navigate to the inventory section.

    - Expected Result: List of all products is displayed, with stock levels and low-stock alerts.

2. Alert Functionality:

    - Scenario: Simulate a product reaching the low-stock threshold.

    - Expected Result: System generates low-stock alert.

3. Edge Case:

    - Scenario: Inventory section accessed with no products in stock.

    - Expected Result: System displays "No products available."

#### Test Scenarios for Use Case 3: Restock Notifications
1. Automatic Alert Generation:

    - Scenario: Simulate product stock dropping below the threshold.

    - Expected Result: Alert generated and sent via the specified notification method.

2. Owner's Review of Notifications:

    - Scenario: Open notifications section to review alerts.

    - Expected Result: Clear list of alerts with actionable insights.

3. Edge Case:

    - Scenario: Notification failure due to system error.

    - Expected Result: Error message informing of failure to generate an alert.

#### Test Scenarios for Use Case 4: Checking Store Status
1. Client Location Input:

    - Scenario: Input location manually or allow GPS detection.

    - Expected Result: System displays nearby pulperías with relevant details.

2. Map View Functionality:

    - Scenario: Client interacts with the map (zoom, pan).

    - Expected Result: Smooth navigation and accurate store data.

3. Edge Case:

    - Scenario: No pulperías available nearby.

    - Expected Result: Message indicating no stores found within the range.

#### Test Scenarios for Use Case 5: Generating Sales Reports
1. Report Generation Process:

    - Scenario: Select timeframe and type of report.

    - Expected Result: System generates report with visualized data (charts, tables).

2. Data Exporting:

    - Scenario: Save report as PDF or Excel file.

    - Expected Result: File is saved successfully.

3. Edge Case:

    - Scenario: Attempt to generate a report when no sales data exists.

    - Expected Result: System displays "No sales data available."

#### General Scenarios for Usability and Security
1. Usability Testing:

    - Scenario: Ask pulpería owners to perform common tasks (record sale, check inventory).

    - Expected Result: Tasks completed without difficulty or confusion.

2. Security Testing:

    - Scenario: Test for SQL injection by inputting malicious data.

    - Expected Result: System rejects malicious inputs and ensures data security.

3. Performance Testing:

    - Scenario: Stress-test the system with 1,000+ sales records and inventory items.

    - Expected Result: System remains responsive and functional.