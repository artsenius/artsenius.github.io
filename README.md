# About Me

A modern, responsive portfolio website built with React, TypeScript, and Styled Components. The site showcases an about section, projects, and contact information with a clean, professional design. View our detailed [Requirements](./Requirements.md) document to understand the full scope and complexity of this application.

## 🚀 Live Demo

Visit the live site at: [https://artsenius.github.io/about](https://artsenius.github.io/about)

## ✨ Features

- Modern React with TypeScript
- Responsive design that works on all devices
- Clean and professional UI with Styled Components
- **🌙 Dark Mode Toggle** - Switch between light and dark themes with persistent preference
- Dynamic routing with React Router v6
- Component-based architecture
- Easy to customize and extend
- **♿ Enhanced Accessibility** - WCAG 2.1 AA compliant with skip navigation, keyboard support, and screen reader optimizations

## 🛠 Tech Stack

- React 18
- TypeScript
- Styled Components
- React Router v6
- GitHub Pages for hosting

## 📦 Project Structure

```
src/
├── components/         # React components
│   ├── About.tsx      # About section component
│   ├── Contact.tsx    # Contact form component
│   ├── Header.tsx     # Navigation header
│   ├── Layout.tsx     # Main layout wrapper
│   └── Projects.tsx   # Projects showcase
├── styles/            # Global styles
├── types/             # TypeScript type definitions
├── App.tsx           # Main App component
└── index.tsx         # Application entry point
```

## 🚀 Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/artsenius/about.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd about
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

The application will start in development mode and open in your default browser at [http://localhost:3000](http://localhost:3000).

## 📝 Development Notes

- The application uses Node.js legacy OpenSSL provider for compatibility
- Custom routing configuration for GitHub Pages deployment
- Responsive design implementation with styled-components

## 🚀 Deployment

To deploy the application to GitHub Pages:

1. Ensure the homepage in `package.json` is set correctly:
   ```json
   "homepage": "https://artsenius.github.io/about"
   ```

2. Build and deploy the application:
   ```bash
   npm run deploy
   ```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.