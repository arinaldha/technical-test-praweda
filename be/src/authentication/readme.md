## Description
Api for authentication PSI OPS

## Endpoint List

### 1. Login

#### Path

POST `/auth/login`

#### Parameter Body
```
{
  "username": "string",
  "password": "string"
}
```
##### Example Request Body

```
{
  "username": "jhon.doe",
  "password": "1234567890"
}
```

#### Response
HTTP status `201`

```
{
	"status": 200,
	"message": "Sukses Login",
	"data": {
		"id": "18bd34b4-d1d5-425b-ba79-010f8b4914e4",
		"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4YmQzNGI0LWQxZDUtNDI1Yi1iYTc5LTAxMGY4YjQ5MTRlNCIsInVzZXJuYW1lIjoibHVkZmkuYXppbWFkYSIsImVtYWlsIjoibHVkZmkuYXppbWFkYUBwcmF3ZWRhLmlkIiwiZ3JvdXAiOiI4MjU5NWI3Zi04MTUwLTQ3YzItYWQ1ZC1mZWViYTNiNzY2NWMiLCJicmFuY2hfaWQiOiJlNWRiYjRiYS1jN2NiLTRlZDUtYmRlMC00NTZkZTA3ZmJiNTUiLCJjb21wYW55X2lkIjoiNjI5Yjc3ODktYzg0Ny00ZDU0LTgyNTUtM2I3YTkyZDBiMmNhIiwia2V5X3Rva2VuIjoiMTA5YzQ5NDktZDJhYi00OGVjLWE2MDEtZTE1Yjg1NTQ5MjQxIiwibGlzdF9tZW51IjpbXSwibWVudV9wZXJtaXNpb24iOlt7Im1lbnVfaWQiOiJlOTk2NzhkZi1lZDNhLTRkNDktYjE5Ni0wYTc4MTRjODhlZTIiLCJtZW51X25hbWUiOiJBcmVuIExhdHRlIiwibWVudV9wYXRoIjoiL2FyZW4iLCJtZW51X2ljb24iOiJjb2ZmZWUiLCJtZW51X29yZGVyX25vIjoxLCJtZW51X3BhcmVudCI6IjEiLCJwZXJtaXNzaW9uX2FjY2VzcyI6W119XSwiaWF0IjoxNzE2Mjg0MTA1LCJleHAiOjE3MTYyOTQ5MDV9.eTZG2y13SldEhH5HElI7tYgTEeiCrAy3tON2yCwI_DU",
		"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4YmQzNGI0LWQxZDUtNDI1Yi1iYTc5LTAxMGY4YjQ5MTRlNCIsInVzZXJuYW1lIjoibHVkZmkuYXppbWFkYSIsImdyb3VwIjoiODI1OTViN2YtODE1MC00N2MyLWFkNWQtZmVlYmEzYjc2NjVjIiwiYnJhbmNoX2lkIjoiZTVkYmI0YmEtYzdjYi00ZWQ1LWJkZTAtNDU2ZGUwN2ZiYjU1IiwiY29tcGFueV9pZCI6IjYyOWI3Nzg5LWM4NDctNGQ1NC04MjU1LTNiN2E5MmQwYjJjYSIsImxpc3RfbWVudSI6W10sIm1lbnVfcGVybWlzaW9uIjpbeyJtZW51X2lkIjoiZTk5Njc4ZGYtZWQzYS00ZDQ5LWIxOTYtMGE3ODE0Yzg4ZWUyIiwibWVudV9uYW1lIjoiQXJlbiBMYXR0ZSIsIm1lbnVfcGF0aCI6Ii9hcmVuIiwibWVudV9pY29uIjoiY29mZmVlIiwibWVudV9vcmRlcl9ubyI6MSwibWVudV9wYXJlbnQiOiIxIiwicGVybWlzc2lvbl9hY2Nlc3MiOltdfV0sImtleV90b2tlbiI6IjEwOWM0OTQ5LWQyYWItNDhlYy1hNjAxLWUxNWI4NTU0OTI0MSIsImlhdCI6MTcxNjI4NDEwNSwiZXhwIjoxNzE2ODg4OTA1fQ.RKyggmfU3jy1OLw9tmMQCkkolGOpLylrMqWMdeLKgns"
	}
}
```
- access_token : 
valid only for 3 hour
- refresh_token : token used for get new access_token

### 2. Refresh Token

#### Path

GET `/auth/refreshToken/:tokenRefresh`
- tokenRefresh : resfresh_token get from login 

#### Parameter Body
```
None
```
##### Example Request Body

```
None
```

#### Response
HTTP status `201`

```
{
	"status": 200,
	"message": "successfully",
	"data": {
		"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4YmQzNGI0LWQxZDUtNDI1Yi1iYTc5LTAxMGY4YjQ5MTRlNCIsInVzZXJuYW1lIjoibHVkZmkuYXppbWFkYSIsImdyb3VwIjoiODI1OTViN2YtODE1MC00N2MyLWFkNWQtZmVlYmEzYjc2NjVjIiwiYnJhbmNoX2lkIjoiZTVkYmI0YmEtYzdjYi00ZWQ1LWJkZTAtNDU2ZGUwN2ZiYjU1IiwiY29tcGFueV9pZCI6IjYyOWI3Nzg5LWM4NDctNGQ1NC04MjU1LTNiN2E5MmQwYjJjYSIsImxpc3RfbWVudSI6W10sIm1lbnVfcGVybWlzaW9uIjpbXSwia2V5X3Rva2VuIjoiZjk5ODZkNDQtNWQ2Yi00YTUyLTlmYTItZmYyNGE5YzA3MDRmIiwia2V5VG9rZW4iOiIwMWY4N2I1NC05MjI5LTRkOTktODQ5OC1kZDBhMDYyNzdlYTMiLCJpYXQiOjE3MTYyNzc4ODgsImV4cCI6MTcxNjI4ODY4OH0.k2BXxLy8bJagC1Fexqn_S2djaY17ivsMZzAgkTnjMrY"
	}
}
```
## Aditional Note

Most API in PSI OPS need Authorization in header using `bearer token`, if token is not valid will get status `401`

HTTP status `401`

```
{
	"message": "Unauthorized",
	"statusCode": 401
}
```

