# Fable – Digital Ebook Sharing Platform

<img width="1535" height="686" alt="Fable Platform" src="https://github.com/user-attachments/assets/586fcb54-4237-4260-8afe-fe59606b72ab" />

**A modern full-stack platform connecting readers with talented writers through original ebooks.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

## 🌐 Live Demo

**Live Site:** https://fable-ebook-sharing-platform-client.vercel.app/


## 📋 Project Overview

Fable is a comprehensive **ebook sharing and selling platform** designed to bridge readers and emerging writers. The platform features a robust **role-based access control (RBAC)** system with three distinct roles: **Reader**, **Writer**, and **Admin**.

Built with modern web technologies, Fable provides a seamless experience for browsing, purchasing, publishing, and managing ebooks, along with secure payment integration and administrative oversight.

## ✨ Key Features

### 👤 For Readers
- Advanced browsing with search, filters, and pagination
- Secure ebook purchases via **Stripe Checkout**
- Personal library, purchase history, bookmarks, and wishlist
- Intuitive role-specific dashboard

### ✍️ For Writers
- Upload and manage ebooks (cover images hosted via imgBB)
- Publish, unpublish, edit, and delete books
- Sales analytics and earnings tracking
- Dedicated writer dashboard

### ⚙️ For Admins
- User management (role changes and moderation)
- Global ebook moderation and control
- Complete transaction and revenue analytics
- Overview dashboard with key metrics

### 🌟 General Features
- Fully responsive design with excellent mobile experience
- Smooth animations powered by Framer Motion
- Secure authentication (Email/Password + Google OAuth via BetterAuth)
- Protected routes with proper hydration handling
- Modern, clean, and recruiter-friendly UI/UX

## 🛠️ Technology Stack

| Layer          | Technologies                                      |
|----------------|---------------------------------------------------|
| **Frontend**   | Next.js 15 (App Router), React, JavaScript, Tailwind CSS, Framer Motion |
| **Backend**    | Node.js, Express.js, MongoDB (Mongoose), JWT      |
| **Authentication** | BetterAuth (Email + Google OAuth)              |
| **Payments**   | Stripe                                            |
| **Image Hosting** | imgBB API                                      |
| **Deployment** | Vercel (Frontend), MongoDB Atlas |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Database (Atlas recommended)
- Stripe Account
- imgBB API Key

### Installation

1. **Clone the repositories**

```bash
# Frontend Client
git clone https://github.com/rashedmojammel/Fable-Ebook-Sharing-Platform-Client.git
cd Fable-Ebook-Sharing-Platform-Client

# Backend Server (in a separate terminal)
git clone https://github.com/rashedmojammel/Fable-Ebook-Sharing-Platform---Server.git
cd Fable-Ebook-Sharing-Platform---Server
