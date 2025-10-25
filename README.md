# SE2_Back_End_LIbrarymanagement
A RESTful API developed using Node.js, Express, and MongoDB Atlas, created to handle the management of Books, Members, and Loans.

## Student Information 
**Developer:** Morly Granado 
**Year & Course:** BSCS 4-1  
**System:** Library System

🌐 Base URL

**Local Deployment:** http://localhost:3000/api

**Deployed URL:** https://se2-back-end1.vercel.app/
## 🔗 List of Endpoints

Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a single book by ID |
| POST | `/books` | Create a new book record |
| PUT | `/books/:id` | Update an existing book |
| DELETE | `/books/:id` | Delete a book record |

Members
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/members` | Retrieve all members |
| GET | `/members/:id` | Retrieve a single member |
| POST | `/members` | Create a new member |
| PUT | `/members/:id` | Update a member's details |
| DELETE | `/members/:id` | Delete a member |

Loans
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/loans` | Get all loan records |
| `GET` | `/api/loans/:id` | Get loan record by ID |
| `POST` | `/api/loans` | Create new loan (member borrows book) |
| `PUT` | `/api/loans/:id` | Update loan (return or extend) |
| `DELETE` | `/api/loans/:id` | Delete a loan record |


## ⚙️ Working CRUD

| Operation | Description | Example Endpoint |
|-----------|-------------|------------------|
| Create | Adds a new document | `POST /books`<br>`POST /members`<br>`POST /loans` |
| Read | Fetches one or many documents | `GET /books`<br>`GET /books/:id` |
| Update | Modifies an existing document | `PUT /books/:id` |
| Delete | Removes a document | `DELETE /books/:id` |

## 📘 API Request Examples
## 📘 Create a Book
```
POST /api/books
Content-Type: application/json

{
  "isbn": "988-0000000005",
  "title": "Deep Dive",
  "author": "Sunshine Lopez",
  "copies": 6
}
```

## 👥 Create a Member
```
POST /api/members  
Content-Type: application/json

{
  "name": "Liam Brown",
  "email": "liam.Brown@example.com",
  "joinedAt": "2025-10-17"
}
```

## 🔗 Borrow a Book (Create Loan)
```
POST /api/loans
Content-Type: application/json

{
  "memberId": "6712e1baf90c3c2f5b987654",
  "bookId": "6712d3a4f90c3c2f5b123456",
  "loanedAt": "2025-10-17T00:00:00.000Z",
  "dueAt": "2025-10-31T00:00:00.000Z"
}
```
## 🧠 Seed/Test Data
## 📘 Books
**1** The Daughter of  A Billionaire — Alexa Red — 5 copies

**2** Trying my Best — Thea Smith — 3 copies

**3** Warrior — Sophia Cruz — 4 copies

👥 Members

**1** Jane_Corro — MorlyG@example.com

**2** Jane Corro — Morly Granado@example.com

**To run the seed script:** 
```
node seed.js
```
## 🧰 Tech Stack
**Backend:** Node.js + Express.js

**Database:** MongoDB Atlas (Mongoose ODM)

**Environment Management:** dotenv

## 📁 Project Structure
```
project/
│
├── app.js                 # Main server file (runs the Express app)
├── seed.js                # Populates MongoDB with sample test data
├── .env                   # Environment variables (e.g., MONGO_URI, PORT)
├── .gitignore             # Prevents sensitive files from being pushed to GitHub
│
├── config/
│   └── db.js              # MongoDB Atlas connection setup
│
├── models/
│   ├── bookModel.js       # Schema and model for Books
│   ├── memberModel.js     # Schema and model for Members
│   └── loanModel.js       # Schema and model for Loans
│
├── routes/
│   ├── bookRoutes.js      # Book-related API routes
│   ├── memberRoutes.js    # Member-related API routes
│   └── loanRoutes.js      # Loan-related API routes
│
└── controllers/
    ├── bookController.js  # Handles logic for book endpoints
    ├── memberController.js# Handles logic for member endpoints
    └── loanController.js  # Handles logic for loan endpoints
```

