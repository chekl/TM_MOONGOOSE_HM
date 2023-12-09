# TM_MONGOOSE_JS_HM

### Installation

1. Clone repo
2. Open the project directory
3. run `npm install` command
4. Update `.env` variables
5. run `npm run dev` command

### Routes

## Users

- `GET /users/` - to get all users with the ability to sort them by age (query parameters: `?age=1` - for ascending; `?age=-1` - for descending). Return only user id, fullName, email and age fields.
- `GET /users/:id` - Retrieve a specific user by their id (Also contain all articles that user created, only title, subtitle and created date fields).
- `POST /users/` - Add a new user. Required parameters: 'firstName', 'lastName', 'email', 'password'.
- `PUT /users/:id` - Update a user's data (firstName, lastName, age).
- `DELETE /users/:id` - Delete a user by id and all articles that he created.

## Articles

- `GET /articles` - Retrieve articles with owner's data (fullName, email and age fields). Also pagination was provided (?limit=5 - limit for one page (by default 5); ?page=0 - number of page (by default 0, that is first page))
- `POST /articles` - Add a new article. Required parameters: 'title', 'description', 'owner', 'category'.
- `PUT /articles/:name` - Update an article. Only owner can update the article. Query password is required
- `DELETE /users/:id` - Delete an article by id. Only owner can delete the article. Query password is required

### Example JSONs

## User

```
{
  "firstName": "Alex", // type string, min length 4, max length 50, required field, trim
  "lastName": "Mirror", // type string, min length 3, max length 60, required field, trim
  "password": "123qwe",
  "email": "exampe@com.com", // type string, required field, email validation, lowercase;
  "role": "admin", //type string, only valid values is [admin, writer, guest]
  "age": 10, //type number, min 1, max 99
}
```

## Article

```
{
  "title": "12345", //type string, min length 5, max length 400, required field, trim
  "subtitle": "12345", //type string, min length 5, not required field,
  "description": "12345", //type string, min length 5, max length 5000, required
  "owner": "657379f65517cfe9a4daa4c7", //user id, required field,
  "category": "games", //type string, valid options [sport, games, history], required
}
```
