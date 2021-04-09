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

export const LOAD_PROFS = gql`
    {
        professorById(id: "9cc14e72-eca7-4528-b2b8-1ab6f16ce02a") {
            id
            name
            areasOfResearch
            applications {
                diplomaDocumentId
            }
        }
    }
`;
export const LOAD_APPLICATION = gql`
  query {
      applicationById(id: "b0071922-6184-480a-a5db-a0897ed85ae3") {
          applicant {
              id
              name
          }
          professor {
              id
              name
          }
          dateSubmitted
          areasOfResearch
          resumeDocumentId
          diplomaDocumentId
          auditDocumentId
      }
  }
`;

