package com.gradadmissionshub.database.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.gradadmissionshub.database.entity.Application;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApplicationRepository extends AbstractRepository<Application, String> {

    public List<Application> findAllApplicationsForProfessor(String professorId) {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(professorId));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("professorId = :val1").withExpressionAttributeValues(eav);
        return mapper.scan(entityClass, scanExpression);
    }

    public List<Application> findAllApplicationsForApplicant(String applicantId) {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(applicantId));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("applicantId = :val1").withExpressionAttributeValues(eav);
        return mapper.scan(entityClass, scanExpression);
    }
}
