<div style="background: black;">
<p align="center" style="margin: 0;">
  <a href="https://dev.marblism.com" target="blank">
    <img src="https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/marblism-logo.png" height="150" alt="Marblism Logo" />
  </a>
</p>
<h1 align="center" style="margin: 0;">In Marble We Trust</h1>

<a  style="margin: 0;" target="_blank" href="https://marblism.com">
<p align="center" style="margin: 0; letter-spacing: 3px;
text-decoration: none;">
marblism
</p>
</a>
</div>
<div style="height: 50px; background: linear-gradient(#000000, transparent);"></div>

# Marbalism Full Stack Dev

## Introduction

Marbalism is a web application designed to assist AI consulting businesses in integrating AI solutions into their business operations. It offers a personalized AI consulting experience through an intuitive online platform. Users can assess their AI readiness, receive tailored recommendations on AI practices, and track the progress of AI integration phases.

## Table of Contents

- [Marbalism Full Stack Dev](#marbalism-full-stack-dev)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Documentation](#documentation)
  - [Installation](#installation)
  - [Usage](#usage)
- [Set up environment variables](#set-up-environment-variables)
- [Set up environment variables](#set-up-environment-variables-1)

## Features

- **AI Readiness Assessment:** Fill out a form to evaluate your current tech stack and AI readiness.
- **Customized AI Integration Reports:** Receive tailored reports providing insights and recommendations suited to your business needs.
- **Resource Database Access:** Access a curated database of AI service providers and educational materials.
- **Progress Tracking:** Monitor the different phases of AI integration within your business.
- **Updates and Notifications:** Stay updated with the latest AI technologies and receive recommendations for adjustments to your integration plan.

## Documentation

Learn more in the [official documentation](https://dev.marblism.com).

## Installation

<div style="color: red;">

> ⚠️ **Important**<br/>Make sure the following tools are installed on your computer:

<p align="center">
<a target="_blank" href="https://www.docker.com/get-started/">![Docker Desktop Version](https://img.shields.io/badge/Docker%20Desktop-4.19.0-black?logo=docker)</a>
<a target="_blank" href="https://nodejs.org/en">![Node.js version](https://img.shields.io/badge/Node.js-20.11.0-black?logo=nodedotjs)</a>
<a target="_blank" href="https://www.npmjs.com/">![npm Version](https://img.shields.io/badge/npm-10.2.4-black?logo=npm)</a>
</p>
</div>

````bash
$ pnpm run init

## Usage

To use the Marbalism app, start by setting up your local environment:

```bash
# Set up environment variables
export SERVER_CLIENT_BASE_URL="https://edgeai.app.io"
export SERVER_BASE_URL="https://server-edgeai.app.io"
export API_BASE_URL="https://server-edgeai.app.io"
export SERVER_AUTHENTICATION_SECRET="11gJ07kB663A1vDN"
bash
Copy code
# Set up environment variables
export SERVER_CLIENT_BASE_URL="https://edgeai.app.io"
export SERVER_BASE_URL="https://server-edgeai.app.io"
export API_BASE_URL="https://server-edgeai.app.io"
export SERVER_AUTHENTICATION_SECRET="11gJ07kB663A1vDN"
Start the server:

bash
Copy code
npm start
Development
bash
Copy code
$ pnpm run dev
View your application in your browser

Production
bash
Copy code
$ pnpm run build
$ pnpm run start
Configuration
Database Configuration: Ensure that the database URL in your environment settings matches the one provided by pgAdmin.
Server Authentication: Utilize the SERVER_AUTHENTICATION_SECRET for secure connections to the backend.
Dependencies
Ensure you have the following dependencies installed:

Node.js
PostgreSQL
Any required NPM packages (see package.json for details)
Troubleshooting
Refer to the "Troubleshooting" section of the provided documentation for common issues like database connection errors, SSL configuration, and network accessibility.

Support
We reply FAST on our <a target="_blank" href="https://discord.gg/GScNz7kAEu">Discord server</a>.
````
