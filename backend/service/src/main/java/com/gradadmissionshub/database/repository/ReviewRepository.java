package com.gradadmissionshub.database.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.gradadmissionshub.database.entity.Review;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ReviewRepository extends AbstractRepository<Review, String> {
    public List<Review> findAllReviewsForApplication(String applicationId) {
        Map<String, AttributeValue> eav = new HashMap<String, AttributeValue>();
        eav.put(":val1", new AttributeValue().withS(applicationId));

        DynamoDBScanExpression scanExpression = new DynamoDBScanExpression()
                .withFilterExpression("applicationId = :val1").withExpressionAttributeValues(eav);
        return mapper.scan(entityClass, scanExpression);
    }
}
