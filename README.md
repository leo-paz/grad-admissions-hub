# Grad Admissions Hub
A system made for keeping track of graduate admissions for both professors and applicants.

# How to Test Backend API
1. Download GraphQL Playground https://github.com/graphql/graphql-playground, for WINDOWS: https://www.electronjs.org/apps/graphql-playground
2. Run ServiceApplicaiton and paste http://localhost:8080/graphql into GraphQL Playground
3. Paste the query in the left box and click the play button
```javascript
{
  bookById(id: "book-1") {
    id
  }
}
```


