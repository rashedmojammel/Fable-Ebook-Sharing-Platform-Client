# Fable – Digital Ebook Sharing Platform

![Fable Banner](https://via.placeholder.com/1280x400/4F46E5/FFFFFF?text=Fable+-+Ebook+Sharing+Platform)  
<!-- Replace with actual high-quality banner/screenshot -->

**A modern full-stack MERN platform connecting readers with talented writers.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)

## 🌐 Live Demo

**Live Site:** [https://your-fable-app.vercel.app](https://your-fable-app.vercel.app)  
*(Update with your actual deployed URL)*

## 📋 Project Overview

Fable is a comprehensive ebook sharing and selling platform built to democratize access to original literature. It features a robust **role-based access control system** with three user roles — **Reader**, **Writer**, and **Admin** — complete with secure payments, content management, and analytics.

The platform demonstrates advanced full-stack development practices using modern technologies and industry-standard tools.

## ✨ Key Features

### For Readers
- Browse, search, filter, and paginate ebooks
- Secure purchase via **Stripe** Checkout
- Personal library, purchase history, bookmarks, and wishlist
- Role-specific dashboard with clean, intuitive UI

### For Writers
- Upload and manage ebooks (with imgBB image hosting)
- Publish, unpublish, edit, and delete books
- Sales tracking and earnings overview
- Dedicated writer dashboard

### For Admins
- Complete user management (role assignment & moderation)
- Global ebook moderation
- Transaction history and revenue analytics
- Overview dashboard with statistical insights

### General Features
- Responsive design with excellent mobile experience
- Smooth animations using Framer Motion
- Advanced search & filtering (title, author, genre, price range)
- Secure authentication (Email/Password + Google OAuth via BetterAuth)
- Protected routes with proper client-side hydration handling
- Dark mode support (optional)

## 🛠️ Technology Stack

| Layer       | Technologies |
|-------------|--------------|
| **Frontend** | Next.js 15 (App Router), React, TypeScript, Tailwind CSS, Framer Motion |
| **Backend**  | Node.js, Express.js, MongoDB (Mongoose), JWT |
| **Auth**     | BetterAuth (Email + Google OAuth) |
| **Payments** | Stripe |
| **Image**    | imgBB API |
| **Deployment** | Vercel (Frontend), Render/Railway (Backend), MongoDB Atlas |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Database
- Stripe Account
- imgBB API Key

### Installation

1. **Clone the repositories**

```bash
# Frontend
git clone https://github.com/yourusername/fable-client.git
cd fable-client

# Backend (in separate terminal)
git clone https://github.com/yourusername/fable-server.git
cd fable-server
