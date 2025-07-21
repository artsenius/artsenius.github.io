# About Me

A modern, responsive portfolio website built with React, TypeScript, and Styled Components. The site showcases an about section, projects, and contact information with a clean, professional design. View our detailed [Requirements](./Requirements.md) document to understand the full scope and complexity of this application.

## 🚀 Live Demo

Visit the live site at: [https://www.arthursenko.com/](https://www.arthursenko.com/)

## ✨ Features

- Modern React with TypeScript
- Responsive design that works on all devices
- Clean and professional UI with Styled Components
- **🌙 Dark Mode Toggle** - Switch between light and dark themes with persistent preference
- **⚡ Performance Optimized** - Lazy loading with code splitting for 15% faster initial load
- **📱 Sticky Footer Layout** - Header and footer always visible, even on short pages
- Dynamic routing with React Router v6
- Component-based architecture
- Easy to customize and extend
- **♿ Enhanced Accessibility** - WCAG 2.1 AA compliant with skip navigation, keyboard support, and screen reader optimizations
- **🔧 Code Quality** - ESLint with pre-commit hooks and automated CI/CD

## 🛠 Tech Stack

- React 18
- TypeScript
- Styled Components
- React Router v6
- ESLint with Husky pre-commit hooks
- GitHub Pages for hosting
- Node.js 20.17+ for optimal compatibility

## 📦 Project Structure

```
src/
├── components/         # React components
│   ├── About.tsx      # About section component
│   ├── AboutApp.tsx   # About this app component
│   ├── Contact.tsx    # Contact form component
│   ├── Header.tsx     # Navigation header
│   ├── Layout.tsx     # Main layout wrapper with sticky footer
│   ├── LiveTestAutomation.tsx # Live automation showcase
│   ├── Projects.tsx   # Projects showcase
│   ├── ThemeProvider.tsx # Theme context provider
│   └── BackToTop.tsx  # Back to top button
├── styles/            # Global styles
├── types/             # TypeScript type definitions
├── config/            # Configuration files
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

## 🔧 Development

### Code Quality
- **ESLint** is configured to maintain code quality
- **Pre-commit hooks** automatically run ESLint on staged files
- **Pre-push hooks** run full ESLint check on the entire codebase
- All linting errors must be resolved before commits are allowed

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

## 📝 Development Notes

- The application uses Node.js legacy OpenSSL provider for compatibility
- Custom routing configuration for GitHub Pages deployment
- Responsive design implementation with styled-components
- Sticky footer layout ensures header and footer are always visible
- ESLint configuration excludes build files and configuration files

## 🚀 Deployment

The application is automatically deployed to GitHub Pages via GitHub Actions:

1. **Automatic Deployment**: Every push to the `main` branch triggers a build and deployment
2. **Node.js 20.17+**: CI/CD uses the latest Node.js for optimal compatibility
3. **Custom Domain**: Configured with `www.arthursenko.com`

### Manual Deployment
To manually deploy the application to GitHub Pages:

1. Ensure the homepage in `package.json` is set correctly:
   ```json
   "homepage": "https://www.arthursenko.com/"
   ```

2. Build and deploy the application:
   ```bash
   npm run deploy
   ```

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.