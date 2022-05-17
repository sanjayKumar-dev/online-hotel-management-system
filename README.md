# online-hotel-management-system
Online Hotel Management System using Spring Boot, Angular and MongoDB

The objective of developing this website/application is to manage the day-to-day activities performed by various hotels. Basically, it maintains the guest, booking, room, inventory, and employee records. It also performs the new booking and is also used for canceling, check-in, and checkout. It is also used to get bookings and department reports. Also able to generate the booking receipts. 


## Technology Used
- Spring Boot
- Spring Security
- Discovery Server (Eureka Server)
- API Gateway
- Spring REST
- Angular
- MongoDB
- Java Mail (Used for sending the Email)
- Swagger
- RabbitMQ (Messing broker used to add message in queue Here, I have used for sending Email)

## Important Features
- Used Microservice Architecture
- Implement Exceptional Handling
- Implement logger
- Intercommunication between microservice using Web Client. (Booking -> Room) and (Booking -> Guest)
- Auto-Generate Id for(Guest, booking, inventory, employee)
- Email Notification when Booking is confirmed
- Used Angular Material for the most UI part
- Role-based  Authentication
- Generate Booking and Department report (Can print or download as pdf)
- Generate the Booking receipt (Can print or download as pdf)
- Can't cancel the booking when the booking is confirmed or the guest is checked In
- Can't check-in when the booking is not confirmed
- Can't check out when a guest is not checked In.

## Microservice
- Guest
- Room
- Booking
- Inventory
- Employee
- Security
- API Gateway
- Discovery Server

## Microservice Functionality

- ### Guest Microservice
  - Add Guest
  - Get Guest Detail by Id
  - Get Guest Detail by EmailId
  - Get All Guest details
  - Update the Guest Details
  - Delete Guest details by Id
  - Get Guest EmailId by guest Id

- ### Room Microservice
  - Add Room
  - Update Room Detail
  - Delete Room Detail by Id
  - Get Room Detail by Id
  - Get All Room details
  - Get Room By Status
  - Get Room price by RoomId

- ### Booking Microservice
  - Add new Booking detail
  - Get Booking detail by booking Id
  - Get All Booking details
  - Update Payment details
  - Cancel Booking
  - Get Available Room for booking
  - Update check-in detail
  - Update check-out detail

- ### Inventory Microservice
  - Add Product
  - Update Product Detail
  - Delete Product Detail by Id
  - Get Product Detail by Id
  - Get All Product details 

- ### Employee Microservice
  - Add Employee
  - Update Employee Detail
  - Delete Employee Detail by Id
  - Get Employee Detail by Id
  - Get All Product Employee 
  - Also it adds department when adding a new Employee. Basically, in the department, we are storing the number of employees and avg salary department-wise.
