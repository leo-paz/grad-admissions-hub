package com.gradadmissionshub.service;

import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.apollographql.apollo.api.Input;
import com.fasterxml.jackson.core.JsonProcessingException;
import graphql.ExecutionInput;
import graphql.ExecutionResult;
import graphql.GraphQL;
import com.amazonaws.services.lambda.runtime.Context;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Handler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {

    GraphQLProvider graphQLProvider;

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> input, Context context) {
        try {
            graphQLProvider = new GraphQLProvider();
            graphQLProvider.init();
        } catch (IOException e) {
            e.printStackTrace();
        }

        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");

        var json = input.get("body").toString();

        var relayMap = parseJson(json);

        System.out.println(relayMap);
        String query = (String) relayMap.get("query");
        var variablesString = relayMap.get("variables");
        Map<String, Object> variables = null;
        if (variablesString == null) {
            variables = new LinkedHashMap<>();
        } else {
            variables = parseJson((String) relayMap.get("variables"));
        }

        ExecutionResult result = graphQLProvider.graphQL().execute(query, (Object) null, variables);
        Map<String, Object> responseBody = new LinkedHashMap<>();
        if (result.getErrors().size() > 0) {
            responseBody.put("errors", result.getErrors());
        }

        responseBody.put("data", result.getData());
        return ApiGatewayResponse.builder()
                .setStatusCode(200)
                .setObjectBody(responseBody)
                .setHeaders(headers)
                .build();
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