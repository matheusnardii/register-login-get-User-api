# CREATE LOGIN AUTHORIZATION API

## Users routes

### User Register POST /users

Boddy Pattern

```json
{
   "name": "John Doe",
   "email": "johnDoe@mail.com",
   "password": "123@Freedom"
}
```

Response (STATUS 201)

```json
{
   "id": 1,
   "name": "John Doe",
   "email": "johnDoe@mail.com"
}
```

### Login POST /users/login

Boddy Pattern

```json
{
   "email": "johnDoe@mail.com",
   "password": "123@Freedom"
}
```

Response (STATUS 200)

```json
{
   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEzOTc0ODgzLCJleHAiOjE3MTQwNjEyODN9.zF4MDZ9bmpvcBCkOgpjLffgfMtn-jBDgVF88AXTvbB8",
   "user": {
	   "id": 1,
	   "name": "John Doe",
	   "email": "johnDoe@mail.com"
	}
}
```

Erros

401 UNAUTHORIZED

```json
{
   "message": "Email and password doesn't match"
}
```

404 NOT FOUND

```json
{
   "message": "User not registered"
}
```

### User Return GET /users

Authorization is required to access this route, provide the Token from the request header

```json
{
   "headers":{
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE0MDQwNjk0LCJleHAiOjE3MTQxMjcwOTR9.otP2tfxgFU1WLkPY9GNSvsa0P5P74EvuyU55U6RMzos"
   } 
}
```

Response (STATUS 200)

```json
{
   "id": 1,
   "name": "John Doe",
   "email": "johnDoe@mail.com"
}
```

#### Errors

401 UNAUTHORIZED
