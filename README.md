# Product Comparison Hub

A simple and clean app that helps you compare products side by side. You can pick up to 3 products and see their differences in an easy-to-read table.

![Product Comparison App Screenshot]
<img width="1919" height="826" alt="image" src="https://github.com/user-attachments/assets/28825cb5-c807-4142-818c-01cfede49a91" />


## ✨ What This App Does

### Main Features
- **Browse Products**: See 8 different tech products (phones and laptops) in a grid
- **Compare Products**: Pick up to 3 products to compare them side by side
- **See Differences**: The app highlights what's different between products
- **Easy Removal**: Remove single products or clear your whole comparison

### Extra Features
- **Search**: Type to find products by name, brand, or features
- **Filter by Brand**: Show only Apple, Samsung, etc.
- **Works on Mobile**: Looks great on phones, tablets, and computers
- **Dark/Light Theme**: Switch between light and dark mode
- **Remembers Your Choices**: Your comparisons stay even if you refresh the page
- **Keyboard Friendly**: Use Tab, Enter, and Space keys to navigate

### Visual Highlights
- **Smart Highlighting**: Different specs are highlighted in blue
- **Smooth Effects**: Nice hover animations and transitions
- **Clean Design**: Modern look that's easy on the eyes
- **Clear Feedback**: You always know what's happening

## 🚀 How to Run This App

### What You Need First
- Node.js (version 14 or newer) - [Download here](https://nodejs.org/)
- That's it! npm comes with Node.js

### Setup Steps

1. **Get the code**:
```bash
git clone <your-repository-url>
cd product-list
```

2. **Install everything**:
```bash
npm install
```

3. **Start the app**:
```bash
npm start
```

4. **Open your browser** and go to [http://localhost:3000](http://localhost:3000)

That's it! The app should now be running on your computer.

## 🛠️ Built With

- **React**: For building the user interface
- **TypeScript**: Helps catch errors while coding
- **Material-UI**: For beautiful, ready-made components
- **CSS**: For custom styling and animations

## 📱 Works Everywhere

This app works great on:
- **Big Screens**: Full comparison table with all features
- **Tablets**: Touch-friendly buttons and layouts
- **Phones**: Everything stacks nicely for small screens

## ♿ Easy to Use for Everyone

- **Keyboard Navigation**: Use Tab, Enter, and Space to navigate without a mouse
- **Screen Reader Friendly**: Works with assistive technology
- **Clear Focus**: You can always see where you are on the page
- **High Contrast**: Works with accessibility settings

## � How It Works

### Product Information
Each product has:
- Basic details (name, brand, price, picture)
- 3 main features
- Detailed specs for comparison
- Unique ID to track selections

### Smart Comparison
- The app automatically finds what's different between products
- Different specs get a blue background
- Everything stays organized in a neat table
- A legend explains what the colors mean

### Technical Stuff
- Uses React hooks to manage what you've selected
- Saves your choices in your browser
- TypeScript helps prevent bugs
- Clean, organized code that's easy to maintain

## 🔧 Other Commands

```bash
npm start          # Start the app for development
npm test           # Run tests to make sure everything works
npm run build      # Create a version ready for the web
```

## 📁 What's Inside

```
src/
├── components/           # All the UI pieces
│   ├── ComparisonPanel  # The comparison table
│   ├── ProductCard      # Individual product cards
│   ├── ProductGrid      # Layout for all products
│   ├── SearchFilter     # Search and filter bar
│   └── ThemeToggle      # Light/dark mode button
├── data/                # Product information
├── utils/               # Helper functions
├── types/               # TypeScript definitions
└── tests/               # Tests to make sure it works
```

## 📸 Screenshots

Since this is running locally, here's what you can expect to see:

1. **Main Page**: Grid of 8 products with search bar at the top
2. **Comparison View**: Table showing selected products side by side
3. **Mobile View**: Everything stacks nicely on small screens
4. **Dark Mode**: Clean dark theme option

## 🔗 Live Demo

To see this app in action:
1. Follow the setup steps above
2. Run `npm start`
3. Open http://localhost:3000 in your browser

## 🧠 Assumptions Made

- **Product Data**: Using 8 sample tech products (phones and laptops)
- **Comparison Limit**: Maximum 3 products can be compared at once
- **Image Source**: Using Unsplash for product images
- **Browser Storage**: Uses localStorage to remember your selections
- **No User Accounts**: Everything is stored locally in your browser
