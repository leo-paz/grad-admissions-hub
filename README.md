# Grad Admissions Hub
A system made for keeping track of graduate admissions for both professors and applicants.

# How to Test Backend API 
1. Download Postman
2. Run ServiceApplication if you want to test locally
3. Paste the url http://localhost:8080/graphql if testing locally, or to test the deployed dev environment API: https://j2ofh2owcb.execute-api.us-east-1.amazonaws.com/dev/graphql. Choose POST request.
4. Paste the query in the left box and click the play button
```javascript
{
  bookById(id: "book-1"){
    id
    name
    pageCount
    author {
      firstName
      lastName
    }
  }
}
```
5. Remove and mix match any fields from the query above and see GraphQL only return the specified fields!

![alt_text](https://github.com/leo-paz/grad-admissions-hub/blob/main/gradadmissionsdiagrams.pdf?raw=true)
![alt_text](https://github.com/leo-paz/grad-admissions-hub/blob/main/gradadmissionsschema.pdf?raw=true)
