import {gql} from '@apollo/client';

export const LOAD_BOOK1 = gql`
query {
  bookById(id: "book-2"){
    id
    name
    pageCount
    author {
      firstName
      lastName
    }
  }
}
`;