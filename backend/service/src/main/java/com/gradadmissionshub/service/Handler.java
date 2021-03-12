package com.gradadmissionshub.service;

import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import graphql.ExecutionResult;
import com.amazonaws.services.lambda.runtime.Context;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Handler implements RequestHandler<Object, Object> {

    GraphQLProvider graphQLProvider;

    @Override
    public Object handleRequest(Object input, Context context) {
        context.getLogger().log("input: " + input);
        try {
            graphQLProvider = new GraphQLProvider();
            graphQLProvider.init();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // TODO : If "query" is null, handle POST REQUEST

        // TODO : If "query" is present, handle GET REQUEST

        System.out.println(input);

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("Access-Control-Allow-Headers", "Content-Type");
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Access-Control-Allow-Methods", "OPTIONS,POST,GET");

        HashMap<String, Object> mapInput = (HashMap<String, Object>) input;

        String query = mapInput.get("query").toString();
        LinkedHashMap<Object, Object> variables = (LinkedHashMap<Object, Object>) mapInput.get("variables");

        ExecutionResult result = graphQLProvider.graphQL().execute(query, (String) null, variables);
        Map<String, Object> responseBody = new LinkedHashMap<>();
        if (result.getErrors().size() > 0) {
            responseBody.put("errors", result.getErrors());
        }
        responseBody.put("data", result.getData());

//        var objectMapper = new ObjectMapper();
//        String response = "";
//        try {s
//            response = objectMapper.writeValueAsString(responseBody);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }

        return responseBody;
    }

    private Map<String, Object> parseJson(String json) {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = null;
        String newJson = json.replace("\\n", "").replace("\\r", "");
        try {
            map = mapper.readValue(newJson, Map.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return map;
    }
}

class InputType {
    private String query;
    private Map<String, Object> variables = new HashMap<>();

    public void setQuery(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }

    public void setVariables(Map<String, Object> variables) {
        this.variables = variables;
    }

    public Map<String, Object> getVariables() {
        return variables;
    }

}