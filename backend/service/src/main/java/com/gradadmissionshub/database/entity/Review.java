package com.gradadmissionshub.database.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.Collection;
import java.util.Date;

@DynamoDBTable(tableName = "Reviews")
public class Review {

    private String id;
    private Integer ranking;
    private String title;
    private String body;
    private String professorId;
    private Date dateSubmitted;

    public Review(Integer ranking, String title, String body, String professorId, Date dateSubmitted) {
        this.ranking = ranking;
        this.title = title;
        this.body = body;
        this.professorId = professorId;
        this.dateSubmitted = dateSubmitted;
    }

    public Review() {}

    @DynamoDBHashKey
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return id;
    }

    @DynamoDBAttribute
    public Integer getRanking() {
        return ranking;
    }

    @DynamoDBAttribute
    public String getTitle() {
        return title;
    }

    @DynamoDBAttribute
    public String getBody() {
        return body;
    }

    @DynamoDBAttribute
    public String getProfessorId() {
        return professorId;
    }

    @DynamoDBAttribute
    public Date getDateSubmitted() {
        return dateSubmitted;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setRanking(Integer ranking) {
        this.ranking = ranking;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public void setProfessorId(String professorId) {
        this.professorId = professorId;
    }

    public void setDateSubmitted(Date dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }
}
