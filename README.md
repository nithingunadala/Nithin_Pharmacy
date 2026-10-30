# Nithin Pharmacy – Management System

Pharmacy app built with React (Vite), Bootstrap 5 and basic JavaScript.

## Run
```
npm install
npm run dev
```
Open the link shown in the terminal (usually http://localhost:5173).

## First use
1. Click **Create an account** and register (name, email, 10-digit mobile, password).
2. Login with the same email and password.

## Features
- Register and Login with validation (email format, mobile number, password strength, duplicate email, wrong password)
- Dashboard: total medicines, low stock, expiry alerts, today's sales
- Medicines: add, edit, delete, search (with validation)
- Billing: cart, 5% GST, stock reduces automatically, printable bill
- Sales history

Data is stored in the browser (localStorage). Passwords are stored as plain text there, which is fine for a college project but a real deployment needs a backend that hashes passwords.
