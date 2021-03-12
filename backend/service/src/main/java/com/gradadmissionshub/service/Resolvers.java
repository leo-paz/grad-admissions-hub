package com.gradadmissionshub.service;

import graphql.schema.DataFetcher;

public class Resolvers {
    public interface Query {
        public DataFetcher<Object> bookById();
    }

    public interface Book {
        public DataFetcher<Object> id();
        public DataFetcher<String> name();
        public DataFetcher<Integer> pageCount();
        public DataFetcher<Object> author();
    }

    public interface Author {
        public DataFetcher<Object> id();
        public DataFetcher<String> firstName();
        public DataFetcher<String> lastName();
    }

}