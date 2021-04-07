package com.gradadmissionshub.service;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import com.gradadmissionshub.database.repository.ApplicantRepository;
import com.gradadmissionshub.database.repository.ApplicationRepository;
import com.gradadmissionshub.database.repository.ProfessorRepository;
import com.gradadmissionshub.database.repository.ReviewRepository;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URL;

import static graphql.schema.idl.TypeRuntimeWiring.newTypeWiring;

@Component
public class GraphQLProvider {

    private GraphQL graphQL;
    private DynamoDBMapper mapper;
    ProfessorRepository profRepo;
    ApplicantRepository applicantRepo;
    ApplicationRepository applicationRepo;
    ReviewRepository reviewRepo;
    GraphQLDataFetchers graphQLDataFetchers;

    @PostConstruct
    public void init() throws IOException {
        mapper = new DynamoDBMapper(AmazonDynamoDBClientBuilder.defaultClient());
        profRepo = new ProfessorRepository();
        profRepo.setMapper(mapper);
        applicantRepo = new ApplicantRepository();
        applicantRepo.setMapper(mapper);
        applicationRepo = new ApplicationRepository();
        applicationRepo.setMapper(mapper);
        reviewRepo = new ReviewRepository();
        reviewRepo.setMapper(mapper);
        graphQLDataFetchers = new GraphQLDataFetchers(profRepo, applicantRepo, applicationRepo, reviewRepo);
        URL url = Resources.getResource("schema.graphqls");
        String sdl = Resources.toString(url, Charsets.UTF_8);
        GraphQLSchema graphQLSchema = buildSchema(sdl);
        this.graphQL = GraphQL.newGraphQL(graphQLSchema).build();
    }

    private GraphQLSchema buildSchema(String sdl) {
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(sdl);
        RuntimeWiring runtimeWiring = buildWiring();
        SchemaGenerator schemaGenerator = new SchemaGenerator();
        return schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);
    }

    private RuntimeWiring buildWiring() {
        return RuntimeWiring.newRuntimeWiring()
                .type(newTypeWiring("Query")
                        .dataFetcher("professorById", graphQLDataFetchers.getProfessorByIdDataFetcher())
                        .dataFetcher("applicantById", graphQLDataFetchers.getApplicantByIdDataFetcher())
                        .dataFetcher("applicationById", graphQLDataFetchers.getApplicationByIdDataFetcher())
                        .dataFetcher("reviewById", graphQLDataFetchers.getReviewByIdDataFetcher())
                        .dataFetcher("professors", graphQLDataFetchers.getAllProfessors()))
                .type(newTypeWiring("Professor")
                        .dataFetcher("applications", graphQLDataFetchers.getApplicationsInProfessorDataFetcher()))
                .type(newTypeWiring("Applicant")
                        .dataFetcher("applications", graphQLDataFetchers.getApplicationsInApplicantDataFetcher()))
                .type(newTypeWiring("Application")
                        .dataFetcher("professor", graphQLDataFetchers.getProfessorInApplicationDataFetcher())
                        .dataFetcher("applicant", graphQLDataFetchers.getApplicantInApplicationDataFetcher()))
                .type(newTypeWiring("Review")
                        .dataFetcher("professor", graphQLDataFetchers.getProfessorInReviewDataFetcher()))
                .build();
    }

    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }
}
