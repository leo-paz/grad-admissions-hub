import { gql } from "@apollo/client";

export const LOAD_APPLICANT1 = gql`
  {
    applicantById(id: "2bfaa7bd-c1ba-4a06-b46a-058fc858cfee") {
        id
        name
        graduationDate
        majors
        applications {
            diplomaDocumentId
        }
    }
}
`;
