# EMS - Employee Management System

A React + Vite + Tailwind app where an admin assigns tasks and employees accept, finish or fail them.
Data is saved in the browser (localStorage), so there is no backend.

## Run

    npm install
    npm run dev

## Demo logins (password: 123)

- Admin: admin@me.com
- Employee: e@e.com (Arjun), employee2@example.com (Sneha), employee3@example.com ...

## Features

- Login with error message, session kept after refresh, log out
- Employee: stat cards (click to filter), task cards with Accept / Done / Failed / Reopen
- Admin: totals, create task (choose employee), all tasks table with filters and delete
- "Reset demo data" button at the bottom of the admin page
