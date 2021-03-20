package com.gradadmissionshub.service;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import com.gradadmissionshub.database.repository.ApplicantRepository;
import com.gradadmissionshub.database.repository.ProfessorRepository;
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
    private ProfessorRepository profRepo;
    private ApplicantRepository applicantRepo;
    GraphQLDataFetchers graphQLDataFetchers;

    @PostConstruct
    public void init() throws IOException {
        mapper = new DynamoDBMapper(AmazonDynamoDBClientBuilder.defaultClient());
        profRepo = new ProfessorRepository();
        profRepo.setMapper(mapper);
        applicantRepo = new ApplicantRepository();
        applicantRepo.setMapper(mapper);
        graphQLDataFetchers = new GraphQLDataFetchers(profRepo, applicantRepo);
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
                        .dataFetcher("applicantById", graphQLDataFetchers.getApplicantByIdDataFetcher()))
                //.type(newTypeWiring("Professor")
                        //.dataFetcher("author", graphQLDataFetchers.getProfessorDataFetcher()))
                .build();
    }

    @Bean
    public GraphQL graphQL() {
        return graphQL;
    }
}
