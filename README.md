# News Aggregator

Welcome to the News Aggregator project! This is a simple web application that aggregates news articles from various sources and presents them in a unified interface.

## Overview

The News Aggregator fetches news articles from the following resources:

- News API
- The Guardian
- The New York Times

It allows users to search for articles, apply filters, and view details of each article.

## Features

- Search articles by keyword
- Filter articles by source, date, or category
- View article details including title, source, published date, and description
- Read full articles by clicking on the link provided

## Technologies Used

- React.js for building the user interface
- Tailwind CSS for styling

## Getting Started

### Running Locally

To run the News Aggregator on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/news-aggregator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd news-aggregator
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your web browser and go to `http://localhost:5173/` to view the application.

### Running with Docker

To run the News Aggregator using Docker, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/news-aggregator.git
   ```

2. Navigate to the project directory:

   ```bash
   cd news-aggregator
   ```
3. Build the Docker image

   ```bash
   docker build -t news-aggregator .
   ```
4. Run a Docker container:

   ```bash
   docker run -d -p 5173:5173 news-aggregator
   ```
