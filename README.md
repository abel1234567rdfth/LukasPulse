AppointBit – Appointment Management System

Live Demo: [https://appoint-bit-1igm.vercel.app/](https://appoint-bit-1igm.vercel.app/)


Project Overview

AppointBit is a full-stack appointment management system originally built for a company and currently in production. For portfolio purposes, this demo version uses mock data while retaining all the architecture, features, and workflows of the production system.

Key Highlights:

✅ User & customer management

✅ Appointment creation, scheduling, and cancellation

✅ Admin dashboard with real-time statistics

✅ SMS notifications via Twilio

✅ Error monitoring with Sentry

✅ Serverless backend with Next.js API routes

✅ Modern, reusable UI components with shadcn/ui

This project highlights full-stack development, serverless architecture, production-ready integrations, and responsive UI design.

🎯 Key Features


1️⃣ User & Customer Management

User signup and onboarding (email, phone, name)

Customer registration with personal & identification details

File upload for verification via Appwrite file storage

Consent and privacy management

2️⃣ Appointment System

Create, schedule, cancel appointments

Assign appointments to agents

Status tracking: pending, scheduled, cancelled

SMS notifications via Twilio

Success confirmation page with appointment details

3️⃣ Admin Dashboard

View appointment statistics

Interactive data table for managing appointments

Easy monitoring of the system

4️⃣ UI & UX

Fully responsive design (desktop, tablet, mobile)

Smooth form interactions with validation

Modern, reusable components using shadcn/ui

🛠 Technologies Used

Frontend: React, Next.js, TypeScript, Tailwind CSS, shadcn/ui
Backend / Serverless: Next.js API routes
Appwrite Services: Database, Authentication, File Storage, Messaging
SMS Notifications: Twilio
Monitoring: Sentry
Forms & Validation: React Hook Form, Zod
Deployment: Vercel
Version Control: Git & GitHub


⚡ Setup & Installation

To run locally:

# Clone the repository
git clone https://github.com/your-username/appointbit.git

# Navigate into project
cd appointbit

# Install dependencies
npm install
# or
yarn

# Run development server
npm run dev
# or
yarn dev

Open http://localhost:3000
 to test the demo version.

📸 Screenshots / Demo

User Registration

<img width="1868" height="894" alt="registration" src="https://github.com/user-attachments/assets/5dbe58f7-2784-4a2a-82d6-f8fc0c340999" />


Customer Registration
<img width="1859" height="832" alt="register-1" src="https://github.com/user-attachments/assets/6ae5e783-c8ba-4699-8188-ee624197897c" />
<img width="1821" height="903" alt="register-2" src="https://github.com/user-attachments/assets/65d94c89-788d-45d7-b592-ea509ecb6775" />
<img width="1827" height="907" alt="register-3" src="https://github.com/user-attachments/assets/dc3f4ebd-86d3-4847-9105-7b3ac05effaa" />


Appointment Form

<img width="1860" height="901" alt="appointment" src="https://github.com/user-attachments/assets/b68930da-135c-44d7-a9b3-674f263e8557" />

Success Confirmation

<img width="1800" height="908" alt="success" src="https://github.com/user-attachments/assets/339c6ebe-b529-4a75-a775-dc4d95252e68" />

Admin Dashboard
<img width="1831" height="902" alt="admin dashboard" src="https://github.com/user-attachments/assets/f2a60957-4c6e-45b9-a7ec-9e0b4093dec7" />


🧩 Challenges & Learnings

Handling top-level fetch in Next.js server components

Managing complex forms with conditional fields, file uploads, and validation

Implementing status-driven appointment workflow

Integrating SMS notifications with Twilio

Setting up Sentry for real-time error monitoring

Building a production-grade serverless system with Appwrite backend services
🔮 Future Improvements

Role-based access for multi-level admins

Email notifications and reminders

Advanced search, filter, and sorting in admin dashboard

Unit and integration testing for forms and APIs

