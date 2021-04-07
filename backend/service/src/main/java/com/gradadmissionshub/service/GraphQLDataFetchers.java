package com.gradadmissionshub.service;

import com.gradadmissionshub.database.entity.Applicant;
import com.gradadmissionshub.database.entity.Application;
import com.gradadmissionshub.database.entity.Professor;
import com.gradadmissionshub.database.entity.Review;
import com.gradadmissionshub.database.repository.ApplicantRepository;
import com.gradadmissionshub.database.repository.ProfessorRepository;
import com.gradadmissionshub.database.repository.ApplicationRepository;
import com.gradadmissionshub.database.repository.ReviewRepository;


import graphql.GraphQL;
import graphql.schema.DataFetcher;
import org.springframework.stereotype.Component;

import java.awt.image.renderable.RenderableImage;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Component
public class GraphQLDataFetchers {

    ProfessorRepository profRepo;
    ApplicantRepository applicantRepo;
    ApplicationRepository applicationRepo;
    ReviewRepository reviewRepo;

    public GraphQLDataFetchers(ProfessorRepository profRepo, ApplicantRepository applicantRepo,
                               ApplicationRepository applicationRepo, ReviewRepository reviewRepo) {
        this.profRepo = profRepo;
        this.applicantRepo = applicantRepo;
        this.applicationRepo = applicationRepo;
        this.reviewRepo = reviewRepo;
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

    public DataFetcher getApplicationByIdDataFetcher() {
        return dataFetchingEnvironment -> {
            String applicationId = dataFetchingEnvironment.getArgument("id");
            Application application = this.applicationRepo.findOne(applicationId);
            return application;
        };
    }

    public DataFetcher getReviewByIdDataFetcher() {
        return dataFetchingEnvironment -> {
            String reviewId = dataFetchingEnvironment.getArgument("id");
            Review review = this.reviewRepo.findOne(reviewId);
            return review;
        };
    }

    public DataFetcher getAllProfessors() {
        return dataFetchingEnvironment -> {
            List<Professor> professors = this.profRepo.findAll();
            return professors;
        };
    }

    public DataFetcher getProfessorInApplicationDataFetcher() {
        return dataFetchingEnvironment -> {
            Application application = dataFetchingEnvironment.getSource();
            String professorId = application.getProfessorId();
            Professor professor = this.profRepo.findOne(professorId);
            return professor;
        };
    }

    public DataFetcher getProfessorInReviewDataFetcher() {
        return dataFetchingEnvironment -> {
            Review review = dataFetchingEnvironment.getSource();
            String professorId = review.getProfessorId();
            Professor professor = this.profRepo.findOne(professorId);
            return professor;
        };
    }

    public DataFetcher getApplicantInApplicationDataFetcher() {
        return dataFetchingEnvironment -> {
            Application application = dataFetchingEnvironment.getSource();
            String applicantId = application.getApplicantId();
            Applicant applicant = this.applicantRepo.findOne(applicantId);
            return applicant;
        };
    }

    public DataFetcher getApplicationsInApplicantDataFetcher() {
        return dataFetchingEnvironment -> {
            Applicant applicant = dataFetchingEnvironment.getSource();
            List<Application> applications = applicationRepo.findAllApplicationsForApplicant(applicant.getId());
            return applications;
        };
    }

    public DataFetcher getApplicationsInProfessorDataFetcher() {
        return dataFetchingEnvironment -> {
            Professor professor = dataFetchingEnvironment.getSource();
            List<Application> applications = applicationRepo.findAllApplicationsForProfessor(professor.getId());
            return applications;
        };
    }
}