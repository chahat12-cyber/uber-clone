API Documentation: User Registration

Endpoint

POST /api/users/register

Description

This API endpoint allows new users to register. It performs the following actions:

Validates the incoming request body fields.

Hashes the password using bcrypt.

Creates a new user in the database.

Generates a JWT token upon successful registration.

Returns the created user and the token.

Request Body

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}

Required Fields:

firstName: String, required, minimum 3 characters

email: String, required, minimum 3 characters

password: String, required

lastName: String, optional, minimum 3 characters

Success Response

Status Code: 201 Created

{
  "token": "<jwt_token_here>",
  "user": {
    "_id": "661f1f8a6e68d5c1e0b9fa83",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "socketId": null
  }
}

Note: The password is never returned in the response due to select: false in the schema.

Error Responses

1. Validation Error

Status Code: 400 Bad Request

{
  "errors": [
    {
      "type": "field",
      "msg": "First name should be at least 3 characters",
      "path": "firstName",
      "location": "body"
    }
  ]
}

2. Missing Fields Error

Status Code: 400 Bad Request

{
  "message": "All Fields are required"
}

3. Server Error

Status Code: 500 Internal Server Error

{
  "message": "Something went wrong"
}

Internal Flow Summary

The registerUser function in user_controller.js is called.

express-validator checks for input validation.

userModel.hashPassword(password) hashes the password.

The createUser() function in user_service.js creates the user.

user.generateAuthtoken() generates the JWT token.

The token and user object are returned in the response.

Notes

Ensure JWT_SECRET is set in your environment variables.

The user model uses bcrypt for password hashing and jsonwebtoken for token generation.

Use appropriate middlewares to protect private routes using the generated token.