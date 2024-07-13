# URL Shortener

A simple URL shortener application built with Node.js, Express, and MySQL using base 62 encoding for shortened URLs.

## Requirements

- Node.js
- MySQL

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/url-shortener.git
    cd url-shortener
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the MySQL database:
    - Create a database and table using the provided `url_shortener.sql` script:
      ```sql
      CREATE DATABASE IF NOT EXISTS url_shortener;

      USE url_shortener;

      CREATE TABLE IF NOT EXISTS urls (
        id INT AUTO_INCREMENT PRIMARY KEY,
        short_code VARCHAR(255) UNIQUE,
        long_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX idx_short_code ON urls (short_code);
      ```

4. Configure the database connection in `server.js`:
    ```javascript
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'url_shortener'
    });
    ```

5. Run the application:
    ```bash
    node server.js
    ```

## Usage

- To shorten a URL, send a POST request to `http://localhost:3000/shorten` with the `longUrl` parameter:
    ```bash
    curl -X POST -d "longUrl=https://www.example.com" http://localhost:3000/shorten
    ```

- To access the shortened URL, visit `http://localhost:3000/{shortCode}`, where `{shortCode}` is the code returned in the response.

## License

This project is licensed under the MIT License.
