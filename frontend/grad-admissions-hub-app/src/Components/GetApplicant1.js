import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_APPLICANT1 } from "../GraphQL/Queries";

function GetApplicant1() {
  // const { loading, error,data } = useQuery(LOAD_BOOK1);
  const { loading, error, data } = useQuery(LOAD_APPLICANT1, { returnPartialData: true });


  if (loading) return (<h1>loading is true</h1>);
  if (error) return (<h1> there is error</h1>);
  if (!data) return (<h1> data is empty</h1>)
  return (
    <div>
      <p>Applicant Name: {data && data.applicantById.name}</p>
      <p>Applicant Id: {data && data.applicantById.id}</p>
      <p>Graduation Date: {data && data.applicantById.graduationDate}</p>
      <p>Applications: </p>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default GetApplicant1;
