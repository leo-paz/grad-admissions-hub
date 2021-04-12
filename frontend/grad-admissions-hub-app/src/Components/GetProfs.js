
import { useQuery } from "@apollo/client";
import { LOAD_PROFS } from "../GraphQL/Queries";
import "./GetProfs.css";

function GetProfs() {
    const { loading, error, data } = useQuery(LOAD_PROFS,{returnPartialData:true});

    if(loading) return (<h1>loading is true</h1>);
    if(error) return (<h1> there is error</h1>);

    return (
        <div className={"display"}>
            <p>Professor ID: {data.professorById.id}</p>
            <p>Professor Name: {data.professorById.name}</p>
            <p>Professor Areas of Research: {data.professorById.areasOfResearch}</p>

        </div>
    );
}



export default GetProfs;