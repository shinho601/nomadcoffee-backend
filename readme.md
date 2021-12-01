# 노마드코더 챌린지

## Setup

 - apollo-server, graphql, nodemon
 - babel
 - prisma
    migrate: `npx prisma migrate dev --name init`
 - PostgreSQL, pgadmin 4
 

## 2nd Task

Nomad Coffee will be an app where developers can go and find the best caffes to work from in 한국!!

On your `schema.prisma` let's create the User model, the model must have the following fields:

- id
- username
- email
- name
- location
- password
- avatarURL
- githubUsername

After you are done, make a `createAccount` resolver.

`createAccount` should:

- Create a user
- Hash the password
- Check that the username / email aren't taken
- Return `ok:true` or `ok:false`, `error:$error` if there is an error.
