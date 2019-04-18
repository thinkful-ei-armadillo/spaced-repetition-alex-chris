# Spaced Repetition

Alexander Reich and Chris Carnivale
 
[Live App](https://ac-spaced-repetition.now.sh/)
[Client Repo](https://github.com/thinkful-ei-armadillo/spaced-repetition-alex-chris-client)

## Summary
Learn a new language through the spaced repetition technique.  This is a DuoLingo clone that utilizes basic data structures and a responsive front end designed in React. Back-end supports multiple languages but only comes pre-seeded with 11 Dutch words.

Project was completed to provided test specifications and built off of a provided project base.

## Endpoints

### Authorization/User Endpoints (provided)

#### post /api/auth/token
Verifies credentials for logins

#### put /api/auth
Allows automatic refreshing of token

#### post /api/user
Handles registration/sign-up

### Language Endpoints

#### get /api/language
Retrieves current language for user

#### get /api/language/head
Retrieves the first word for the user to learn for the specified language

#### post /api/language/guess
Handles user translation submissions
Confirms guess was included in request body
Creates a linked list data structure and automatically populates said list  form the database
Compares guess to correct translation
If correct, doubles saved memory value, increases the score for total score and correct word score and moves the word to the (memory value)th position or to the end of the list
IF incorrect, resets the memory value, increases the incorrect count for the word, moves the word to the next position in the list
Then, persists all changes to the database and returns data for the next word

## Technology Used
- Node
- Express
- PostgreSQL
- Knex.js
- Chai, Mocha, Supertest

