# 🌿 Fresh Root — Organic Food E-Commerce Platform

> **Short Description:**  
> Fresh Root is a modern, full-stack e-commerce web application designed for buying authentic organic food products. Built with Next.js, TypeScript, Express, and MongoDB, it features real-time inventory management, dynamic product filtering, seamless cart flows, and an optimized, responsive user interface.

![Fresh Root Banner](https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200)

**Fresh Root** is a modern, responsive, and full-stack **E-Commerce Platform** tailored for purchasing authentic organic food products (such as pure honey, natural jaggery, ghee, and fresh items). Built with high performance and accessibility in mind, it provides a seamless shopping experience with dynamic filtering, real-time inventory management, and an interactive UI.

---

## 🚀 Live Demo & Repository

* 🌐 **Live Website:** [Fresh Root Live Demo](https://fresh-root-gilt.vercel.app)
* 📁 **GitHub Repository:** [Fresh Root Source Code](https://github.com/Programing360/fresh-root)

---

## ✨ Key Features

* **📦 Dynamic Product Filtering & Search:** Search products by keyword, category, or price range with server-side query optimizations.
* **⚡ Interactive Product Cards:** Grid & List view options, quick product preview, wishlist toggling, and comparison actions.
* **🛡️ Smart Inventory Management:** Dynamic stock validation that automatically disables cart actions (`OUT OF STOCK`) when items are unavailable.
* **⚡ Optimized Image Delivery:** Resilient image loading pipeline with automatic fallbacks for missing data.
* **🎨 Modern UI/UX:** Built with Tailwind CSS, dark mode support, smooth micro-interactions powered by Framer Motion, and customized loading indicators.
* **📱 Fully Responsive:** Fully optimized for mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** [Next.js](https://nextjs.org/) (App Router, React 18, TypeScript)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://framer.com/motion)
* **Icons:** [Lucide React](https://lucide.dev/)

### **Backend**
* **Server Runtime:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) (Native MongoDB Driver)
* **Type Safety:** TypeScript

---

💥 Technical Challenges & Solutions
1. Invalid HTML Nesting & Event Bubbling Error
Challenge: Nesting actionable <button> tags inside Next.js <Link> elements inside clickable parent containers caused invalid DOM structures and triggered multiple conflicting event handlers.

Solution: Separated navigation links from action buttons, styled <Link> elements directly using Tailwind CSS, and applied explicit e.stopPropagation() with type="button" attributes on child elements.

2. Handling Out-of-Stock Products
Challenge: Users could attempt to add unavailable items (availability === false) to their cart, leading to invalid orders.

Solution: Built conditional button state logic that dynamically disables interaction, updates cursor styling (cursor-not-allowed), and displays an "OUT OF STOCK" status badge.

3. Next.js Image Engine Fallbacks
Challenge: Missing database image fields (null or undefined) caused Next.js's <Image /> optimization component to crash the page.

Solution: Configured an inline fallback image pipeline (product?.image || fallbackUrl) ensuring smooth UI rendering regardless of missing backend assets.
