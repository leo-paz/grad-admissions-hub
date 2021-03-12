# Hosting

## AWS Lambda
We use AWS Lambda to host our GraphQL endpoint that will also talk to our database

## AWS Amplify
We use AWS Amplify to serve our web application which works by just linking our frontend folder.

We have two environments: test, main. The idea is that changes will always be merged first into test where they are deployed to make sure they're are no breaking changes. Once we have verified there are no breaking changes it will then be merged into main which will always be working (hopefully).

# Libraries

## AWS Lambda
We use some lambda packages that are provided by Amazon to make sure our function properly implements the required function handler and returns.

## GraphQL-Java
We use the GraphQL-Java library for serving a GraphQL API.