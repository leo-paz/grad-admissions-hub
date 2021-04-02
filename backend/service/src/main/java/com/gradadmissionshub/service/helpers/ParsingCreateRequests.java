package com.gradadmissionshub.service.helpers;

import com.gradadmissionshub.database.entity.Applicant;
import com.gradadmissionshub.database.entity.Application;
import com.gradadmissionshub.database.entity.Professor;
import com.gradadmissionshub.database.entity.Review;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;

public class ParsingCreateRequests {

    public static Professor buildProfessorFromFields(LinkedHashMap<String, Object> professorFields) {
        if (!validProfessorFields(professorFields)) {
            throw new IllegalArgumentException("IllegalArgumentException: Must have id, name, areasOfResearch, and applications");
        }
        var prof = new Professor((String) professorFields.get("id"),
                (String) professorFields.get("name"), (List<String>) professorFields.get("areasOfResearch"));
        return prof;
    }

    private static boolean validProfessorFields(LinkedHashMap<String, Object> professorFields) {
        if (professorFields.get("id") == null) {
            return false;
        } else if (professorFields.get("name") == null) {
            return false;
        } else if (professorFields.get("areasOfResearch") == null) {
            return false;
        }
        return true;
    }

    public static Applicant buildApplicantFromFields(LinkedHashMap<String, Object> applicantFields) {
        if (!validApplicantFields(applicantFields)) {
            throw new IllegalArgumentException("IllegalArgumentException: Must have id, name, graduationDate, majors, and applications");
        }
        Applicant applicant = null;
        try {
            applicant = new Applicant((String) applicantFields.get("id"),
                                      (String) applicantFields.get("name"),
                                       new SimpleDateFormat("dd/MM/yyyy").parse((String) applicantFields.get("graduationDate")),
                                        (List<String>) applicantFields.get("majors"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return applicant;
    }

    private static boolean validApplicantFields(LinkedHashMap<String, Object> applicantFields) {
        if (applicantFields.get("id") == null){
            return false;
        } else if (applicantFields.get("name") == null) {
            return false;
        } else if (applicantFields.get("graduationDate") == null) {
            return false;
        } else if (applicantFields.get("majors") == null) {
            return false;
        }
        return true;
    }

    public static Application buildApplicationFromFields(LinkedHashMap<String, Object> applicationFields) {
        if (!validApplicationFields(applicationFields)) {
            throw new IllegalArgumentException("IllegalArgumentException: Must have applicant, professor, dateSubmitted, areaOfResearch, " +
                    "resumeDocumentId, diplomaDocumentId, auditDocumentId, and reviews");
        }
        Application application = null;
        try {
            application = new Application((String) applicationFields.get("applicant"),
                    (String) applicationFields.get("professor"),
                    new SimpleDateFormat("dd/MM/yyyy").parse((String) applicationFields.get("dateSubmitted")),
                    (List<String>) applicationFields.get("areasOfResearch"));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        application.setResumeDocumentId((String) applicationFields.get("resumeDocumentId"));
        application.setDiplomaDocumentId((String) applicationFields.get("diplomaDocumentId"));
        application.setAuditDocumentId((String) applicationFields.get("auditDocumentId"));
        application.setReviewIds((List<String>) applicationFields.get("reviews"));
        return application;
    }

    private static boolean validApplicationFields(LinkedHashMap<String, Object> applicationFields) {
        if (applicationFields.get("applicant") == null) {
            return false;
        } else if (applicationFields.get("professor") == null) {
            return false;
        } else if (applicationFields.get("dateSubmitted") == null) {
            return false;
        } else if (applicationFields.get("areasOfResearch") == null) {
            return false;
        } else if (applicationFields.get("resumeDocumentId") == null) {
            return false;
        } else if (applicationFields.get("diplomaDocumentId") == null) {
            return false;
        } else if (applicationFields.get("auditDocumentId") == null) {
            return false;
        } else if (applicationFields.get("reviews") == null) {
            return false;
        }
        return true;
    }

    public static Review buildReviewFromFields(LinkedHashMap<String, Object> reviewFields) {
        if (!validReviewFields(reviewFields)) {
            throw new IllegalArgumentException("IllegalArgumentException: Must have ranking, title, body, professor, and dateSubmitted");
        }
        Review review = null;
        try {
            review = new Review((Integer) reviewFields.get("ranking"),
                    (String) reviewFields.get("title"),
                    (String) reviewFields.get("body"),
                    (String) reviewFields.get("professor"),
                    new SimpleDateFormat("dd/MM/yyyy").parse((String) reviewFields.get("dateSubmitted")));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return review;
    }

    private static boolean validReviewFields(LinkedHashMap<String, Object> reviewFields) {
        if (reviewFields.get("ranking") == null) {
            return false;
        } else if (reviewFields.get("title") == null) {
            return false;
        } else if (reviewFields.get("body") == null) {
            return false;
        } else if (reviewFields.get("professor") == null) {
            return false;
        } else if (reviewFields.get("dateSubmitted") == null) {
            return false;
        }
        return true;
    }
}
