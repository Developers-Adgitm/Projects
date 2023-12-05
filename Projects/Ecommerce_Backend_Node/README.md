# Ecommerce Backend Documentation

Welcome to the documentation for the Ecommerce Backend, a RESTful API built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This API provides the backend functionality for an e-commerce website, including user authentication, product management, order processing, and more.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
   - [Cloning the Repository](#cloning-the-repository)
   - [Environment Configuration](#environment-configuration)
   - [Installing Dependencies](#installing-dependencies)
   - [Running the Server](#running-the-server)
3. [API Routes](#api-routes)
   - [Authentication](#authentication)
   - [Users](#users)
   - [Products](#products)
   - [Orders](#orders)
4. [POST Routes Format](#POST-Routes-Format)
5. [Security Measures](#security-measures)
6. [Error Handling](#error-handling)
7. [Technologies Used](#technologies-used)
8. [Deployed Backend](#deployed-backend)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Getting Started

### Cloning the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/mayank1784/Ecommerce-fullStack.git
```
### Environment Configuration

In the project folder, you'll find a `config` .
Make a config.env file in it. Update the variables in `config.env` with your specific configuration details.

Here's an example of config.env:

```bash
DB_URL="mongodb://127.0.0.1:27017/Ecommerce"
JWT_SECRET="your-secret-key"
JWT_EXPIRE=5d
COOKIE_EXPIRE=5
SMTP_SERVICE=gmail
SMTP_MAIL='your-email@gmail.com'
SMTP_PASSWORD='your-email-password'
SMTP_HOST='smtp.gmail.com'
SMTP_PORT=465
```

### Installing Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd ./backend
npm install
```

### Running the Server

To start the server, use one of the following commands:

- For production:
   ```bash
  npm start
  ```

- For development (with nodemon for automatic server restarts):
  ```bash
  npm run dev
  ```
  By default, the server will run on port 3000. You can access the API at `http://localhost:3000/api/v1`

## API Routes

The Ecommerce Backend provides the following API routes:

### Authentication

- `POST /api/v1/register` : Register a new user.
- `POST /api/v1/login` : Log in as an existing user.
- `GET /api/v1/logout` : Log out the currently authenticated user.
- `POST /api/v1/password/forgot` : Request a password reset email.
- `PUT /api/v1/users/resetPassword/:token` : Reset the password using the provided token.

### Users

- `GET /api/v1/me` : Get the details of the currently authenticated user.
- `PUT /api/v1/me/update` : Update the user's profile information.
- `PUT /api/v1/password/update` : Update the user's password (requires authentication).
- `GET /api/v1/admin/users` : Get a list of all users (admin role required).
- `GET /api/v1/admin/user/:id` : Get details of a specific user (admin role required).
- `PUT /api/v1/admin/user/:id` : Update a user's details (admin role required).
- `DELETE /api/v1/admin/user/:id` : Delete a user (admin role required).

### Products

- `GET /api/v1/products` : Get a list of all products.
- `POST /api/v1/admin/product/new` : Create a new product (admin role required).
- `PUT /api/v1/admin/product/:id` : Update a product (admin role required).
- `DELETE /api/v1/admin/product/:id` : Delete a product (admin role required).
- `GET /api/v1/product/:id` : Get details of a specific product.
- `PUT /api/v1/review` : Add a product review (requires authentication).
- `GET /api/v1/reviews` : Get all product reviews.
- `DELETE /api/v1/reviews` : Delete a product review (requires authentication).

### Orders

- `POST /api/v1/order/new` : Create a new order (requires authentication).
- `GET /api/v1/order/:id` : Get details of a specific order (requires authentication).
- `GET /api/v1/orders/me` : Get all orders for the currently authenticated user (requires authentication).
- `GET /api/v1/admin/orders` : Get all orders (admin role required).
- `PUT /api/v1/admin/order/:id` : Update the status of an order (admin role required).
- `DELETE /api/v1/admin/order/:id` : Delete an order (admin role required).

## POST Routes Format

### Register a New User

- URL: `/api/v1/register`
- Method: POST
- Authentication: Not required
- Request Body: JSON Object

**Request Body**
- name (String, required): The user's full name.
- email (String, required): The user's email address.
- password (String, required): The user's password.

*Example Request Body:*

```bash
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

*Response:*

- Success Response (201 Created)

   - message (String): "User registered successfully."
   - data (Object):
      - token (String): A JSON Web Token (JWT) for user authentication.
      - user (Object): The registered user's details, including the `_id`, `name`, and `email`.

*Example Response:*

```bash
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "_id": "5fbb6ea6a12b3456cd2de",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
  }
}
```

### Log In as an Existing User

- URL: `/api/v1/login`
- Method: POST
- Authentication: Not required
- Request Body: JSON Object

**Request Body**
- email (String, required): The user's registered email address.
- password (String, required): The user's password.

*Example Request Body:*

```bash
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

*Response:*

- Success Response (200 OK)

   - message (String): "Login successful."
   - data (Object):
      - token (String): A JSON Web Token (JWT) for user authentication.
      - user (Object): The authenticated user's details, including the `_id`, `name`, and `email`.


*Example Response*

```bash
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "_id": "5fbb6ea6a12b3456cd2de",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
  }
}
```

### Request a Password Reset Link

- **URL:** `/api/v1/password/forgot`
- **Method:** `POST`
- **Authentication:** Not required
- **Request Body:** JSON Object

**Request Body**

- **email** (String, required): The email address associated with the user's account.

*Example Request Body:*

```json
{
  "email": "johndoe@example.com"
}
```

**Response:**

- Success Response (200 OK)

   - **message** (String): "Password reset email sent successfully."
   - **data** (String): A message confirming that a password reset email has been sent to the provided email address.

*Example Response:*

```json
{
  "success": true,
  "message": "Password reset email sent successfully.",
  "data": "Password reset email has been sent to johndoe@example.com"
}
```

**Error Response:**

- 404 Not Found

   - **message** (String): "User not found with this email address."
   - **data** (String): A message indicating that no user account was found with the provided email address.

*Example Error Response:*

```json
{
  "success": false,
  "message": "User not found with this email address.",
  "data": "No user account found with the email address johndoe@example.com"
}
```

### Create a New Product (Admin)

- **URL:** `/api/v1/admin/product/new`
- **Method:** `POST`
- **Authentication:** Required (Admin Role)
- **Request Body:** JSON Object

**Request Body**

- **name** (String, required): The name of the product.
- **description** (String, required): A detailed description of the product.
- **price** (Number, required): The price of the product.
- **category** (String, required): The category to which the product belongs.
- **stock** (Number, required): The available stock quantity of the product.
- **images** (Array of Objects, required): An array of image objects containing `public_id` and `url`.

*Example Request Body:*

```bash
{
  "name": "Example Product",
  "description": "This is an example product description.",
  "price": 49.99,
  "category": "Electronics",
  "stock": 100,
  "images": [
    {
      "public_id": "image1",
      "url": "https://example.com/image1.jpg"
    },
    {
      "public_id": "image2",
      "url": "https://example.com/image2.jpg"
    }
  ]
}
```

**Response:**

- Success Response (201 Created)

   - **message** (String): "Product created successfully."
   - **data** (Object): The newly created product's details, including the `_id`, `name`, `description`, `price`, `category`, `stock`, and `images`.

*Example Response:*

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "5fbb6ea6a12b3456cd2de",
    "name": "Example Product",
    "description": "This is an example product description.",
    "price": 49.99,
    "category": "Electronics",
    "stock": 100,
    "images": [
      {
        "public_id": "image1",
        "url": "https://example.com/image1.jpg"
      },
      {
        "public_id": "image2",
        "url": "https://example.com/image2.jpg"
      }
    ]
  }
}
```

### Place a New Order

- **URL:** `/api/v1/order/new`
- **Method:** `POST`
- **Authentication:** Required (User)
- **Request Body:** JSON Object

**Request Body**

- **shippingInfo** (Object, required): Shipping information.
   - **address** (String, required): The shipping address.
   - **city** (String, required): The city for shipping.
   - **state** (String, required): The state for shipping.
   - **country** (String, required): The country for shipping.
   - **pincode** (Number, required): The postal code for shipping.
   - **phoneNo** (String, required): The contact phone number for shipping.
- **orderItems** (Array of Objects, required): An array of ordered items.
   - **name** (String, required): The name of the product.
   - **price** (Number, required): The price of the product.
   - **quantity** (Number, required): The quantity of the product.
   - **image** (String, required): The URL of the product image.
   - **product** (String, required): The product ID.
- **paymentInfo** (Object, required): Payment information.
   - **id** (String, required): The payment ID.
   - **status** (String, required): The payment status.
- **paidAt** (Date, required): The date and time of payment.
- **itemsPrice** (Number, required): The total price of ordered items.
- **shippingPrice** (Number, required): The shipping price.
- **totalPrice** (Number, required): The total order price.

*Example Request Body:*

```json
{
  "shippingInfo": {
    "address": "123 Main St",
    "city": "Cityville",
    "state": "Stateville",
    "country": "Countryland",
    "pincode": 12345,
    "phoneNo": "123-456-7890"
  },
  "orderItems": [
    {
      "name": "Example Product 1",
      "price": 49.99,
      "quantity": 2,
      "image": "https://example.com/product1.jpg",
      "product": "5fbb6ea6a12b3456cd2de"
    },
    {
      "name": "Example Product 2",
      "price": 29.99,
      "quantity": 1,
      "image": "https://example.com/product2.jpg",
      "product": "5fbb6ea6a12b3456cd2df"
    }
  ],
  "paymentInfo": {
    "id": "payment123",
    "status": "paid"
  },
  "paidAt": "2023-09-30T10:00:00Z",
  "itemsPrice": 129.97,
  "shippingPrice": 10.00,
  "totalPrice": 139.97
}
```

**Response:**

- Success Response (201 Created)

   - **message** (String): "Order placed successfully."
   - **data** (Object): The newly created order's details, including the `_id`, `shippingInfo`, `orderItems`, `paymentInfo`, `paidAt`, `itemsPrice`, `shippingPrice`, and `totalPrice`.

*Example Response:*

```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "_id": "5fbb6ea6a12b3456cd2df",
    "shippingInfo": {
      "address": "123 Main St",
      "city": "Cityville",
      "state": "Stateville",
      "country": "Countryland",
      "pincode": 12345,
      "phoneNo": "123-456-7890"
    },
    "orderItems": [
      {
        "name": "Example Product 1",
        "price": 49.99,
        "quantity": 2,
        "image": "https://example.com/product1.jpg",
        "product": "5fbb6ea6a12b3456cd2de"
      },
      {
        "name": "Example Product 2",
        "price": 29.99,
        "quantity": 1,
        "image": "https://example.com/product2.jpg",
        "product": "5fbb6ea6a12b3456cd2df"
      }
    ],
    "paymentInfo": {
      "id": "payment123",
      "status": "paid"
    },
    "paidAt": "2023-09-30T10:00:00Z",
    "itemsPrice": 129.97,
    "shippingPrice": 10.00,
    "totalPrice": 139.97
  }
}
```

## Security Measures

- User authentication using JWT (JSON Web Tokens).
- Password hashing using bcrypt.js.
- Password reset token generation with expiration.
- Role-based authorization for admin and user roles.
- Email sending for password reset and user registration verification.

## Error Handling

The backend handles errors gracefully and provides clear error messages when endpoints encounter issues.
Error responses include status codes and informative error messages.

## Technologies Used
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing
- Nodemailer for email sending
- Express Validator for input validation
- Crypto module for generating password reset tokens

## Deployed Backend

The backend is deployed on the following URL:

[https://ecombackend-w9y0.onrender.com/](https://ecombackend-w9y0.onrender.com/)

To access the API routes when not cloned locally, you can use tools like [Postman](https://www.postman.com/) or make `HTTP` requests from your frontend application to the above URL.

Feel free to explore and use this API for building your e-commerce application. If you have any questions or need further assistance, please don't hesitate to reach out.

**Note**: This documentation assumes you have basic knowledge of RESTful APIs and how to make HTTP requests.
