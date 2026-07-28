<div align="center">

# 🛒 nexCart

### 🚀 AI-Powered Full-Stack Multi-Vendor eCommerce Platform

A production-ready **Multi-Vendor eCommerce Marketplace** built with **Spring Boot**, **React**, **TypeScript**, **Spring Security**, **JWT**, **Google OAuth2**, **MySQL**, **Razorpay**, **Stripe**, **Groq AI**, and **Google Gemini AI**.

Designed to provide a seamless shopping experience for **Customers**, **Sellers**, and **Administrators** with secure authentication, AI-powered assistance, online payments, inventory management, and intelligent product discovery.

---

### 🌐 Live Application

| Platform | URL |
|----------|-----|
| 🖥️ Frontend (Vercel) | https://nex-cart-pearl.vercel.app |
| ⚙️ Backend API (AWS EC2) | https://nexcart.duckdns.org |

---

![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.3-6DB33F?logo=springboot)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)
![Spring Security](https://img.shields.io/badge/Spring_Security-6-6DB33F?logo=springsecurity)
![JWT](https://img.shields.io/badge/JWT-Authentication-red)
![Google OAuth](https://img.shields.io/badge/OAuth2-Google-4285F4?logo=google)
![Razorpay](https://img.shields.io/badge/Razorpay-Integration-0C2451)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)
![AWS EC2](https://img.shields.io/badge/AWS-EC2-FF9900?logo=amazonaws)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![Nginx](https://img.shields.io/badge/Nginx-Reverse_Proxy-009639?logo=nginx)
![License](https://img.shields.io/badge/License-MIT-green)

---

⭐ If you like this project, please consider giving it a **Star** on GitHub!

</div>

---

# 📖 Overview

**nexCart** is a modern **AI-powered Multi-Vendor eCommerce Platform** designed to provide a complete online marketplace solution for **Customers**, **Sellers**, and **Administrators**.

The platform offers secure authentication, AI-powered shopping assistance, online payments, intelligent product search, inventory management, order tracking, seller analytics, and an easy-to-use administration panel.

The application follows a **RESTful architecture** with a scalable backend powered by **Spring Boot** and a modern frontend built using **React + TypeScript**.

It is deployed on **AWS EC2** with **Nginx Reverse Proxy**, secured using **HTTPS (Let's Encrypt SSL)**, while the frontend is hosted on **Vercel** for high performance and global availability.

---

# 🚀 Live Demo

### 🌍 Frontend

> **Vercel Deployment**

🔗 https://nex-cart-pearl.vercel.app

---

### ⚙️ Backend REST API

> **AWS EC2 Deployment**

🔗 https://nexcart.duckdns.org

---

# 🏗️ Deployment Architecture

```text
                   🌐 Users
                      │
                      │ HTTPS
                      ▼
      ┌──────────────────────────────────┐
      │       React + TypeScript         │
      │          (Vercel Hosting)        │
      └──────────────────────────────────┘
                      │
                      │ REST APIs
                      ▼
      ┌──────────────────────────────────┐
      │        Nginx Reverse Proxy       │
      │     HTTPS + Let's Encrypt SSL    │
      └──────────────────────────────────┘
                      │
                      ▼
      ┌──────────────────────────────────┐
      │       Spring Boot Backend        │
      │          AWS EC2 Instance        │
      └──────────────────────────────────┘
                      │
        ┌─────────────┼──────────────┐
        │             │              │
        ▼             ▼              ▼
     MySQL       Razorpay       Stripe
   (AWS EC2)      Payment       Payment

                      │
                      ▼

          Groq AI & Google Gemini AI
```

---

# ✨ Key Highlights

- 🛒 AI-Powered Multi-Vendor eCommerce Platform
- 🔐 Secure JWT Authentication
- 🔑 Google OAuth2 Login
- 🤖 AI Shopping Assistant
- 🎙️ AI Voice Search
- 💳 Razorpay Payment Integration
- 💳 Stripe Payment Integration
- 📦 Order Management
- 🏪 Dedicated Seller Dashboard
- 👑 Admin Dashboard
- 📊 Sales Analytics
- 📱 Fully Responsive UI
- ☁️ AWS EC2 Deployment

- ---

# ✨ Features

## 👤 Customer Features

- 🔐 Secure Registration & Login
- 🔑 Google OAuth2 Authentication
- 🛡 JWT Authentication
- 🛍 Browse Products
- 🔍 Advanced Product Search
- 🤖 AI Shopping Assistant
- 🎙 AI Voice Search
- ❤️ Wishlist Management
- 🛒 Shopping Cart
- 💳 Razorpay Payment Gateway
- 💳 Stripe Payment Gateway
- 📦 Order Tracking
- ⭐ Product Reviews & Ratings
- 👤 User Profile Management
- 📧 Email OTP Verification

---

## 🏪 Seller Features

- 📝 Seller Registration
- 📊 Seller Dashboard
- 📦 Product Management
- 📸 Product Image Upload
- 📈 Inventory Management
- 📦 Order Management
- 💰 Revenue Analytics
- 📉 Sales Reports
- 👤 Seller Profile Management
- ✔ Seller Verification
- 📊 Stock Management

---

## 👑 Admin Features

- 📊 Admin Dashboard
- 👥 User Management
- 🏪 Seller Management
- 📦 Product Management
- 🗂 Category Management
- 🎟 Coupon Management
- 📦 Order Management
- 📈 Revenue Analytics
- 📋 Reports
- ⚙ Platform Monitoring

---

# 🤖 Artificial Intelligence Features

nexCart leverages Generative AI to enhance the shopping experience.

- 🤖 AI Shopping Assistant
- 💬 Groq AI Chatbot
- 🧠 Google Gemini AI Integration
- 🎙 AI Voice Search
- 🎯 Personalized Product Recommendations
- 🛍 Smart Product Suggestions
- 💡 Intelligent Customer Support

---

# 💳 Payment Gateway Integration

The platform supports secure online payments using multiple payment providers.

| Gateway | Status |
|----------|--------|
| Razorpay | ✅ Integrated |
| Stripe | ✅ Integrated |
| Online Checkout | ✅ Supported |
| Payment Status Tracking | ✅ Available |
| Secure Payment Flow | ✅ Enabled |

---

# 🔐 Security Features

- Spring Security
- JWT Authentication
- Google OAuth2 Login
- BCrypt Password Encryption
- Role-Based Authorization
- Protected REST APIs
- Email OTP Authentication
- Secure Password Storage
- CORS Protection
- Authentication Filters

---

# 🛠 Technology Stack

## Backend

| Technology | Description |
|------------|-------------|
| Java 21 | Core Programming Language |
| Spring Boot | Backend Framework |
| Spring Security | Authentication & Authorization |
| Spring Data JPA | Database ORM |
| Hibernate | ORM Framework |
| REST APIs | Backend Services |
| Maven | Build Tool |
| JWT | Authentication |
| Google OAuth2 | Social Login |

---

## Frontend

| Technology | Description |
|------------|-------------|
| React 19 | UI Library |
| TypeScript | Programming Language |
| Vite | Frontend Build Tool |
| Redux Toolkit | State Management |
| Tailwind CSS | Styling Framework |
| Material UI | UI Components |
| Axios | HTTP Client |

---

## Database

| Technology | Description |
|------------|-------------|
| MySQL | Relational Database |

---

## Artificial Intelligence

| Service | Purpose |
|----------|---------|
| Groq AI | AI Shopping Assistant |
| Google Gemini AI | Intelligent Recommendations |

---

## Payment Services

| Service | Purpose |
|----------|---------|
| Razorpay | Indian Payment Gateway |
| Stripe | International Payment Gateway |

---

## Cloud & Deployment

| Technology | Description |
|------------|-------------|
| AWS EC2 | Backend Hosting |
| Vercel | Frontend Hosting |
| Nginx | Reverse Proxy |
| DuckDNS | Domain Mapping |
| Let's Encrypt | SSL Certificate |
| MariaDB / MySQL | Production Database |

---

# 📂 Project Structure

```text
nexCart
│
├── assets
│
├── source code
│   │
│   ├── backend-spring boot
│   │   ├── src
│   │   ├── pom.xml
│   │   ├── Dockerfile
│   │   ├── target
│   │   └── ...
│   │
│   ├── frontend-vite
│   │   ├── src
│   │   ├── public
│   │   ├── package.json
│   │   └── ...
│   │
│   └── README.md
│
└── README.md
```

---

# ☁ Deployment

## 🌐 Frontend

- **Platform:** Vercel
- **Framework:** React + Vite
- **URL:** https://nex-cart-pearl.vercel.app

---

## ⚙ Backend

- **Platform:** AWS EC2
- **Framework:** Spring Boot
- **Server:** Nginx Reverse Proxy
- **SSL:** Let's Encrypt
- **URL:** https://nexcart.duckdns.org

---

## 🗄 Database

- MySQL
- Hosted on AWS EC2
- Spring Data JPA
- Hibernate ORM

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/githimansh/nexCart.git
```

---

## Backend Setup

```bash
cd "source code/backend-spring boot"

mvn clean install

mvn spring-boot:run
```

Backend Server

```
http://localhost:5454
```

---

## Frontend Setup

```bash
cd "source code/frontend-vite"

npm install

npm run dev
```

Frontend Server

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend project.

```env
SERVER_PORT=

DB_URL=
DB_USERNAME=
DB_PASSWORD=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

RAZORPAY_KEY=
RAZORPAY_SECRET=

STRIPE_SECRET_KEY=

MAIL_USERNAME=
MAIL_PASSWORD=

GROQ_API_KEY=
GROQ_MODEL=
GROQ_API_URL=

GEMINI_API_KEY=
GEMINI_API_URL=
```

---

# 📡 REST API Overview

The backend exposes secure RESTful APIs for Customers, Sellers, Administrators, AI services, Payments, Authentication, Orders, Products, and Inventory Management.

## Authentication APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/signup` | Register Customer |
| POST | `/auth/signin` | Login Customer |
| POST | `/auth/google` | Google OAuth Login |

---

## Customer APIs

- Product Listing
- Product Details
- Product Search
- Wishlist
- Cart
- Checkout
- Orders
- Reviews
- Profile

---

## Seller APIs

- Seller Dashboard
- Product Management
- Order Management
- Revenue Analytics
- Inventory Management

---

## Admin APIs

- User Management
- Seller Management
- Product Management
- Category Management
- Coupon Management
- Reports

---

# 🔐 Authentication Flow

The application follows a secure authentication mechanism using **Spring Security**, **JWT**, and **Google OAuth2**.

```text
                User

                  │

                  ▼

        Login / Signup Request

                  │

                  ▼

          Spring Security

                  │

        Username / Password

            OR Google OAuth

                  │

                  ▼

            JWT Generation

                  │

                  ▼

          Protected REST APIs

                  │

                  ▼

          Authorized Resources
```

---

# 🤖 AI Module

nexCart integrates modern Generative AI services to improve customer experience.

## Groq AI

- AI Shopping Assistant
- Product Recommendation
- Customer Support
- Shopping Guidance

---

## Google Gemini AI

- Intelligent Product Suggestions
- AI Product Search
- Personalized Shopping Experience

---

# 💳 Payment Workflow

The platform supports secure online payments using multiple payment providers.

```text
Customer

   │

Add Product to Cart

   │

Checkout

   │

Select Payment Method

   ├──────────────┐
   │              │
   ▼              ▼

Razorpay       Stripe

   │              │

Payment Success

   │

Order Created

   │

Inventory Updated

   │

Order Tracking
```

---

# ☁ Production Deployment

## Frontend

- Hosted on **Vercel**
- Global CDN
- Automatic Deployment
- HTTPS Enabled

---

## Backend

- Hosted on **AWS EC2**
- Spring Boot Application
- Nginx Reverse Proxy
- HTTPS using Let's Encrypt

---

## Database

- MySQL
- Hosted on AWS EC2
- Hibernate ORM
- Spring Data JPA

---

# ⚡ Performance Features

- RESTful Architecture
- Stateless Authentication
- JWT Security
- Production Deployment
- Responsive User Interface
- Optimized API Responses
- Secure Password Encryption
- Lazy Loading
- Modular Codebase
- Scalable Backend Architecture

---

# 🧪 Testing

The project has been tested for

- ✅ Customer Registration
- ✅ Customer Login
- ✅ Google OAuth Login
- ✅ JWT Authentication
- ✅ Product Search
- ✅ Cart Management
- ✅ Wishlist
- ✅ Checkout
- ✅ Razorpay Integration
- ✅ Stripe Integration
- ✅ AI Chat Assistant
- ✅ Seller Dashboard
- ✅ Admin Dashboard
- ✅ Order Management

---

# 📸 Application Screenshots

> Screenshots will be added soon.

### 🏠 Home Page

<img width="100%" src="assets/screenshots/home.png">

---

### 🛍 Product Details

<img width="100%" src="assets/screenshots/product.png">

---

### 🛒 Shopping Cart

<img width="100%" src="assets/screenshots/cart.png">

---

### 💳 Checkout

<img width="100%" src="assets/screenshots/checkout.png">

---

### 🤖 AI Shopping Assistant

<img width="100%" src="assets/screenshots/ai-chat.png">

---

### 🏪 Seller Dashboard

<img width="100%" src="assets/screenshots/seller-dashboard.png">

---

### 👑 Admin Dashboard

<img width="100%" src="assets/screenshots/admin-dashboard.png">

---

# 📈 Project Highlights

✔ Production Ready

✔ Full Stack Architecture

✔ AI Powered

✔ Multi Vendor Marketplace

✔ Spring Security

✔ JWT Authentication

✔ Google OAuth2

✔ Razorpay Integration

✔ Stripe Integration

✔ AWS EC2 Deployment

✔ Vercel Deployment

✔ HTTPS Enabled

✔ Responsive Design

✔ RESTful APIs

✔ Modern UI

✔ Scalable Architecture

---

# 🎯 Future Enhancements

- Docker Support
- Kubernetes Deployment
- Redis Cache
- Elasticsearch
- Mobile Application
- AI Image Search
- Recommendation Engine
- Multi Language Support
- Microservices Architecture
- CI/CD using GitHub Actions
- 🌐 Vercel Deployment
- 🔒 HTTPS Enabled
- ⚡ Production Ready Architecture

- ---

# 🤝 Contributing

Contributions are always welcome!

If you'd like to improve **nexCart**, follow these steps:

1. Fork this repository
2. Create a new feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

---

# 🛣 Roadmap

## Completed ✅

- Customer Authentication
- Google OAuth2 Login
- JWT Authentication
- Seller Dashboard
- Admin Dashboard
- Product Management
- Inventory Management
- Wishlist
- Shopping Cart
- Checkout
- Razorpay Integration
- Stripe Integration
- AI Shopping Assistant
- Groq AI Integration
- Gemini AI Integration
- AWS EC2 Deployment
- Vercel Deployment
- HTTPS Configuration
- Nginx Reverse Proxy
- Production Database
- Email OTP Authentication

---

## Upcoming 🚀

- Docker Support
- Kubernetes Deployment
- Redis Caching
- Elasticsearch
- AWS S3 Image Storage
- GitHub Actions CI/CD
- Push Notifications
- Mobile Application
- AI Image Search
- Live Order Tracking
- Recommendation Engine
- Multi-language Support
- Analytics Dashboard
- Seller Subscription Plans

---

# 📊 Project Statistics

| Category | Details |
|----------|---------|
| Project Type | Full Stack Multi-Vendor eCommerce |
| Backend | Spring Boot |
| Frontend | React + TypeScript |
| Database | MySQL |
| Authentication | JWT + Google OAuth2 |
| AI | Groq + Google Gemini |
| Payment | Razorpay + Stripe |
| Cloud | AWS EC2 |
| Frontend Hosting | Vercel |
| Reverse Proxy | Nginx |
| SSL | Let's Encrypt |
| API Architecture | RESTful APIs |

---

# 🌍 Deployment Details

| Service | Technology |
|----------|------------|
| Frontend | Vercel |
| Backend | AWS EC2 |
| Reverse Proxy | Nginx |
| SSL Certificate | Let's Encrypt |
| Database | MySQL |
| Authentication | Spring Security + JWT |
| Domain | DuckDNS |

---

# 📈 Repository Information

- **Project Name:** nexCart
- **Architecture:** Monolithic REST API
- **Deployment:** Production Ready
- **License:** MIT
- **Language:** Java + TypeScript
- **Status:** 🟢 Active Development

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and distribute this project for educational and commercial purposes.

---

# 👨‍💻 About the Developer

## Himanshu Kumar

**Java Full Stack Developer**

Passionate about building scalable backend systems, cloud-native applications, AI-powered software, and enterprise-grade web applications using modern technologies.

### 💼 Skills

- Java
- Spring Boot
- Spring Security
- Hibernate
- REST APIs
- React
- TypeScript
- MySQL
- AWS EC2
- JWT
- OAuth2
- Docker (Learning)
- Git & GitHub

---

# 📫 Connect With Me

### GitHub

https://github.com/githimansh

---

### LinkedIn

https://linkedin.com/in/himanshu-kumar-b86231256

---

### LeetCode

https://leetcode.com/u/Himu2486

---

# 🙏 Acknowledgements

Special thanks to the open-source community and the amazing technologies that made this project possible.

- Spring Boot
- React
- TypeScript
- MySQL
- Spring Security
- Razorpay
- Stripe
- Groq AI
- Google Gemini
- AWS
- Vercel
- Nginx
- GitHub

---

# ⭐ Support the Project

If you found this project helpful, please consider giving it a ⭐ on GitHub.

Your support motivates future development and helps others discover the project.

---

<div align="center">

# ⭐ Thank You for Visiting nexCart ⭐

### Built with ❤️ using Java, Spring Boot, React & AI

🚀 Happy Coding!

</div>
