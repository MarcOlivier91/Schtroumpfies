# API FOR USERS

## SIGNUP (Type : POST)

``Route : localhost:3000/users/signup``

Users are able to create account using this endpoint. The body for creating is as follows :

```
{ 
 "username": String, // Must be unique
 "email": String,
 "password": String // Must be 8 characters long at least
} 
```

If the request is succesful, the server will respond a `200` status code with the following message : `SUCCESS : User created.` <br>

Putting the wrong URL for creating users will result in a `404` status error code meaning that the URL you put is incorrect. <br>

However, if the body is incoplete, the server will return a `500` status error and will return you the error in a JSON format like the exemple below :

```
User validation failed: username: Username is a required field
```

Attempting to create an user with an already existing username will also result in a `500` status error code. The error will return the following JSON format :

```
{
 "index": 0,
 "code": 11000,
 "keyPattern": {
  "username": 1
 },
 "keyValue": {
  "username": "jean-pierre"
 }
}
```

Finally, putting a password shorter than 8 characters will also result in a `500` error code and will return a JSON as follows :

```
{
 "errors": {
  "password": {
   "name": "ValidatorError",
   "message": "Path `password` (`1234`) is shorter than the minimum allowed length (8).",
   "properties": {
    "message": "Path `password` (`1234`) is shorter than the minimum allowed length (8).",
    "type": "minlength",
    "minlength": 8,
    "path": "password",
    "value": "1234"
   },
   "kind": "minlength",
   "path": "password",
   "value": "1234"
  }
 },
 "_message": "User validation failed",
 "name": "ValidationError",
 "message": "User validation failed: password: Path `password` (`1234`) is shorter than the minimum allowed length (8)."
}
```

## GETTING USERS (Type : GET)

``Route : localhost:3000/user``

Using this, you are able to get the listing of every users using this endpoint. If the request is succesful, you will get a `200` status code and the server will return the list of created users :

```
	{
		"_id": "64b55300621f722755d88ca2",
		"username": "john cena",
		"email": "marc@olivier.fr",
		"joined": "2023-07-17T14:41:04.256Z"
	},
	{
		"_id": "64b6373f67174d1aec6ef5c1",
		"username": "jambon beurre",
		"email": "jambon@beurre.fr",
		"joined": "2023-07-18T06:54:55.290Z"
	},
	{
		"_id": "64b65b10c37c19c90051a6a1",
		"username": "nfrealmusic",
		"email": "nf@realmusic.fr",
		"joined": "2023-07-18T09:27:44.339Z"
	}
```

### Getting users via id (Type : GET)

``Route : localhost:3000/user/{id}``

It is also possible to retrive only one user's informations using their id number. Replace `{id}` in the url by the user you want to find. If the request is correct, it will result in a `200` status code and will return the user's information as a JSON format as follows :

```
	{
		"_id": "64b55300621f722755d88ca2",
		"username": "john cena",
		"email": "marc@olivier.fr",
		"joined": "2023-07-17T14:41:04.256Z"
	},
```

Putting an incorrect id or an id that doesn't exist will result in a `404` status code and will give you the following message : `ERROR : User not found.`

## UPDATING USER'S INFORMATIONS (Type: PATCH)

``Route : localhost:3000/user/{id}``

It is possible to update one user's specific informations. Replace `{id}` in the url by the user you want to update informations. The body is the same as creating one user :

```
{
 "username": String, // Must be unique
 "email": String,
 "password": String // Must be 8 characters long at least
} 
```

A succesful request will result in a `200` status code and will return the updated user's informations in a JSON format. <br>
If the id is incorrect of there's no user with the mentionned id, the server will return a `404` status error code with the following message : `ERROR : User not found.` <br>
Attempting to put random characters and numbers as the id may result in a `500` error status code and will crash the server, so be careful.

## DELETING AN USER (Type: DELETE)

``Route : localhost:3000/user/{id}``

Using the id of an user, you will be able to delete it. Replace `{id}` in the url by the user you want to delete. If the request is succesful, you will have a `200` status code with the following message : `SUCCESS : User deleted.`

Putting an incorrect id or an id that doesn't exist will result in a `404` status code and will give you the following message : `ERROR : User not found.`

Attempting to put random characters and numbers as the id may result in a `500` error status code and will crash the server, so be careful.
