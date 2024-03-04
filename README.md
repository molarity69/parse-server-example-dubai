# Dubai Landmarks Backend Service 🏙️🌐

This project serves as the backend service for the Dubai Landmarks frontend application. It is built on the Parse Server and provides a robust API for handling data related to Dubai's landmarks.

## Prerequisites

Before you get started, ensure you have the following installed:

- **Node.js**: Version 20.11.1 or later
- **npm**: Version 10.4.0 or later

## Getting Started

Follow these steps to get the backend service up and running:

1. **Clone the Repository**

```bash
git clone https://github.com/molarity69/parse-server-example-dubai.git
cd parse-server-example-dubai
```

1. **Install NPM Packages**
Install the necessary dependencies for the project:

```bash
npm install
```

1. **Environment Configuration**

Create a `.env` file in the root directory of your project. This file should contain all the necessary environment variables required by Parse Server, such as database URI, application ID, master key, etc.

1. **Running the Server**

Start the Parse Server:

```bash
npm start
```

This command will launch the server, making it accessible via `http://localhost:1337/parse`.

## Parse Dashboard

Optionally, you can run the Parse Dashboard for easier management and debugging of your Parse Server:

1. Ensure you have the `parse-dashboard` package installed globally:

```bash
npm install -g parse-dashboard
```

2. Start the dashboard using the configuration file:

```bash
parse-dashboard --config ./parse-dashboard-config.json --host 127.0.0.1
```

This will make the Parse Dashboard available at `http://127.0.0.1:4040`.

## Cloud Code

The `cloud` folder contains Parse Cloud functions that are used in conjunction with the frontend Dubai Landmarks project. These functions can be modified or extended based on the project's requirements.
