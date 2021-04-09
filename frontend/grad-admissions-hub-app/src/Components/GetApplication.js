import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_APPLICATION } from "../GraphQL/Queries";


const GetApplication = () => {
  const { data } =  useQuery(LOAD_APPLICATION,{returnPartialData:true});
    useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div>
     <p><h4>File for Review: </h4> {data && data.applicationById.applicant.name}</p>            
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default GetApplication;


