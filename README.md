# 🔗 URL Shortener API

A lightweight and efficient URL shortener service built using **Node.js**, **Express.js**, and **MongoDB**. This RESTful API enables you to convert long URLs into concise, shareable links. It also supports redirection, click tracking, and link expiration functionality.

---

## 🚀 Key Features

- 🔗 Generate short links from any valid URL  
- ↪️ Redirect users via short codes  
- 📊 Monitor total click counts per link  
- ⏳ Automatically expire links after a defined time  
- 🛡️ Protect endpoints with request rate limiting  
- 📐 Clean and REST-compliant API design  

---

## ⚙️ Tech Stack

- **Runtime**: Node.js  
- **Framework**: Express.js  
- **Database**: MongoDB + Mongoose  
- **Validation**: [`validator`](https://www.npmjs.com/package/validator)  
- **Short ID Generator**: [`nanoid`](https://www.npmjs.com/package/nanoid)  
- **Rate Limiting**: [`express-rate-limit`](https://www.npmjs.com/package/express-rate-limit)  
- **Environment Config**: `dotenv`  

---

## 🛠️ Getting Started

### 1️⃣ Clone This Repository

```bash
git clone https://github.com/Aru-shi-Tiwari/mini_url_shortener_api.git
cd mini_url_shortener_api
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Create a .env File
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlShortener
BASE_URL=http://localhost:5000
```
### 4. Start The Server
```bash
npm start
```
## API Endpoints

### ✅ POST `/shorten`

**Description:** Create a short URL

**Request Body (JSON):**
```json
{
  "url": "https://example.com/some/very/long/link",
  "expiryDays": 2
}
```
**Response**
```json
{
  "shortUrl": "http://localhost:5000/cbM4bJ"
}
```

### 🔁 Get `/:code`

**Description** Redirect to original long URL

**Example:**
```
GET http://localhost:5000/M3xtS8
```

### 📊 Get `/analytics/:code`

**Description** Returns the number of times a short URL was clicked
**Response**
```json
{
    "originalUrl": "https://example.com/some/very/long/link",
    "clickCount": 9
}
```

## 🐳 Docker Instructions

To run the app with Docker:

```bash
docker-compose up --build
```


## 🧪 Postman Collection

You can test all endpoints using this [Postman Collection](.\Collections_Postman\mini_url_shortener_collection.postman_collection.json).

## 👨‍💻 Author
Arushi Tiwari

## 📄 License

This project is licensed under the [MIT License](./LICENSE).