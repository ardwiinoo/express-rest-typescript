# API Specs

## Register User
Request :
- Method : POST
- Endpoint : `/register`
- Header :
    - Content-Type : application/json
    - Accept : application/json
- Body :
```json
{
  "email" : "string",
  "name" : "string",
  "password" : "string"
}
```
- Response :
```json
{
  "status" : "boolean",
  "statusCode" : "number",
  "message" : "string"
}
```

## Login User
Request :
- Method : POST
- Endpoint : `/login`
- Header :
    - Content-Type : application/json
    - Accept : application/json
- Body :
```json
{
  "email" : "string",
  "password" : "string"
}
```
- Response :
```json
{
  "status" : "boolean",
  "statusCode" : "number",
  "message" : "string",
  "data" : {
    "accessToken" : "string",
    "refreshToken" : "string"
  }
}
```

## Refresh Token
Request :
- Method : POST
- Endpoint : `/refresh`
- Header :
    - Content-Type : application/json
    - Accept : application/json
- Body :
```json
{
  "refreshToken" : "string",
}
```
- Response :
```json
{
  "status" : "boolean",
  "statusCode" : "number",
  "message" : "string",
  "data" : {
    "accessToken" : "string",
  }
}
```
