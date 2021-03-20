package com.gradadmissionshub.service;

import com.gradadmissionshub.database.entity.Applicant;
import com.gradadmissionshub.database.entity.Professor;
import com.gradadmissionshub.database.repository.ApplicantRepository;
import com.gradadmissionshub.database.repository.ProfessorRepository;

import graphql.schema.DataFetcher;
import org.springframework.stereotype.Component;

@Component
public class GraphQLDataFetchers {

    ProfessorRepository profRepo;
    ApplicantRepository applicantRepo;

    public GraphQLDataFetchers(ProfessorRepository profRepo, ApplicantRepository applicantRepo) {
        this.profRepo = profRepo;
        this.applicantRepo = applicantRepo;
    }

    public DataFetcher getProfessorByIdDataFetcher() {
        return dataFetchingEnvironment -> {
            String professorId = dataFetchingEnvironment.getArgument("id");
            Professor prof = this.profRepo.findOne(professorId);
            return prof;
        };
    }

    public DataFetcher getApplicantByIdDataFetcher() {
        return dataFetchingEnvironment -> {
            String applicantId = dataFetchingEnvironment.getArgument("id");
            Applicant applicant = this.applicantRepo.findOne(applicantId);
            return applicant;
        };
    }
}