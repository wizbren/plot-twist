# Plot-Twist Project
A collaborative storytelling web app where multiple users can contribute to a single story, one paragraph at a time. 

Plot-Twist allows users to log in, view stories, add to them, and finish them. Each story grows unpredictably as different users add their own twist. Think “tag-team writing,” but with buttons and a database.

## Getting Started

1. clone the project using `git clone [SSH KEY].`
  - note: replace [SSH KEY] with the SSH key found by clicking the <> Code button in the upper right of this repo.

2. install dependencies: `npm i`

3. Set up the database
- ensure your have PostgreSQL installed and running
- run: `CREATE DATABASE [db_name];`
- run the following:
```
\i db/schema/users.sql
\i db/schema/stories.sql
\i db/schema/contributions.sql
\i db/schema/likes.sql

\i db/seeds/users.sql
\i db/seeds/stories.sql
\i db/seeds/contributions.sql
\i db/seeds/likes.sql
```

4. make sure that the .env file matches your information:
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`

5. Start the app: `npm run local`

6. Navigate to the app: http://localhost:8080/

note: if you need to reset your database run this -> `npm run db:reset`  

## Final Product

!["Screenshot of from page"](https://github.com/wizbren/plot-twist/blob/master/docs/front_page_overview(2).png)

!["Screenshot of story creation author view"](https://github.com/wizbren/plot-twist/blob/master/docs/story_creation_author_view.png)

!["Screenshot of read story view"](https://github.com/wizbren/plot-twist/blob/master/docs/read_story_view.png)

!["Screenshot of form submission author view"](https://github.com/wizbren/plot-twist/blob/master/docs/form_submission_author_view.png)

!["Screenshot of ERD"](https://github.com/wizbren/plot-twist/blob/master/docs/ERD.png)

## Dependencies

- bootstrap       : 5.3.6
- chalk           : 4.1.2
- concurrently    : 8.2.2
- cookie session" : 2.1.0
- dotenv          : 16.4.7
- ejs             : 3.1.10
- express         : 4.21.2
- morgan          : 1.10.0
- pg              : 8.13.1
- sass            : 1.83.1
