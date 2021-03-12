import React, {useEffect} from 'react';
import {useQuery} from '@apollo/client';
import{LOAD_BOOK1} from '../GraphQL/Queries';

function GetBook1(){

    const {error, loading, data} =  useQuery(LOAD_BOOK1);
    useEffect(() => {
        if(data) {
            console.log(data);
        }
    }, [data]);

    return(
        <div>
            <p><b>ID: </b>{data && data.bookById.id}, <b>Name:</b> {data && data.bookById.name} <b>Page Count: </b>{data && data.bookById.pageCount}, <b>Author: </b>{data && data.bookById.author.lastName}</p>
            <pre>{JSON.stringify(data, null, 2) }</pre>

            <h2></h2>
        </div>
    )
}

export default GetBook1;