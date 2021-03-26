
import { useQuery } from "@apollo/client";
import { LOAD_PROFS } from "../GraphQL/Queries";
import "./GetProfs.css";


/*
function GetProfs() {
    const { data } = useQuery(LOAD_PROFS);
    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    return (
        <div className={"display"}>
            <p>
                <b>ID: </b>
                {data && data.id}, <b>Name:</b> {data && data.name}{" "}
            </p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
 */


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