# Getting Started with Cute Scoop Shop

## 1. Prerequisites
**CRITICAL: You do not have Node.js installed!**

1.  **Install Node.js**: Download and install the "LTS" version from [nodejs.org](https://nodejs.org/).
2.  **Install pnpm**: Open a new terminal after installing Node and run:
    ```bash
    npm install -g pnpm
    ```

## 2. Setup (The "Virtual Environment")
In Node.js, running the install command creates a `node_modules` folder. This is your isolated "virtual environment" for this specific project.

```bash
# Install dependencies (creates node_modules)
pnpm install
```

## 3. Running the Site
```bash
# Start the local development server
pnpm dev
# or
npm run dev
```

## 4. Viewing
Open your browser to the URL shown in the terminal (usually `http://localhost:5173` or `http://localhost:3000`).
