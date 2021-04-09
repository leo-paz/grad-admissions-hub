package com.gradadmissionshub.service;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.gradadmissionshub.database.entity.Applicant;
import com.gradadmissionshub.database.entity.Professor;
import com.gradadmissionshub.database.repository.ApplicantRepository;
import com.gradadmissionshub.database.repository.ApplicationRepository;
import com.gradadmissionshub.database.repository.ProfessorRepository;
import com.gradadmissionshub.database.repository.ReviewRepository;
import com.gradadmissionshub.service.helpers.ParsingCreateRequests;
import graphql.ExecutionResult;
import com.amazonaws.services.lambda.runtime.Context;

import java.io.IOException;
import java.util.*;

import com.fasterxml.jackson.databind.ObjectMapper;

public class Handler implements RequestHandler<Object, Object> {

    GraphQLProvider graphQLProvider;
    AmazonDynamoDB adb;
    DynamoDBMapper mapper;
    LambdaLogger logger;
    ProfessorRepository profRepo;
    ApplicantRepository applicantRepo;
    ApplicationRepository applicationRepo;
    ReviewRepository reviewRepo;

    @Override
    public Object handleRequest(Object input, Context context) {
        try {
            logger = context.getLogger();
            graphQLProvider = new GraphQLProvider();
            graphQLProvider.init();
            adb = AmazonDynamoDBClientBuilder.defaultClient();
            mapper = new DynamoDBMapper(adb);
            profRepo = new ProfessorRepository();
            profRepo.setMapper(mapper);
            applicantRepo = new ApplicantRepository();
            applicantRepo.setMapper(mapper);
            applicationRepo = new ApplicationRepository();
            applicationRepo.setMapper(mapper);
            reviewRepo = new ReviewRepository();
            reviewRepo.setMapper(mapper);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        HashMap<String, Object> mapInput = (HashMap<String, Object>) input;

        if (mapInput.get("query") != null) {
            Map<String, Object> responseBody = new LinkedHashMap<>();
            var query = mapInput.get("query").toString();
            LinkedHashMap<Object, Object> variables = (LinkedHashMap<Object, Object>) mapInput.get("variables");

            ExecutionResult result = graphQLProvider.graphQL().execute(query, (String) null, variables);

            if (result.getErrors().size() > 0) {
                responseBody.put("errors", result.getErrors());
            }
            responseBody.put("data", result.getData());
            return responseBody;
        } else if (mapInput.get("Professor") != null) {
            var prof = ParsingCreateRequests.buildProfessorFromFields((LinkedHashMap<String, Object>) mapInput.get("Professor"));
            profRepo.save(prof);
            return prof;
        } else if (mapInput.get("Applicant") != null) {
            var applicant = ParsingCreateRequests.buildApplicantFromFields((LinkedHashMap<String, Object>) mapInput.get("Applicant"));
            applicantRepo.save(applicant);
            return applicant;
        } else if (mapInput.get("Application") != null) {
            var application = ParsingCreateRequests.buildApplicationFromFields((LinkedHashMap<String, Object>) mapInput.get("Application"));
            applicationRepo.save(application);
            return application;
        } else if (mapInput.get("Review") != null) {
            var review = ParsingCreateRequests.buildReviewFromFields((LinkedHashMap<String, Object>) mapInput.get("Review"));
            reviewRepo.save(review);
            return review;
        } else {
            throw new IllegalArgumentException("IllegalArgumentException: Must be a query, Applicant Body, Professor Body, Application Body, or Review Body");
        }
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

    private Map<String, String> getHeaders() {
        Map<String, String> headers = new HashMap<>();

        headers.put("Content-Type", "application/json");
        headers.put("Access-Control-Allow-Headers", "Content-Type");
        headers.put("Access-Control-Allow-Origin", "*");
        headers.put("Access-Control-Allow-Methods", "OPTIONS,POST,GET");

        return headers;
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