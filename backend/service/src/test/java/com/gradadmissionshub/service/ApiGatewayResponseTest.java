package com.gradadmissionshub.service;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

@SpringBootTest
public class ApiGatewayResponseTest {
    ApiGatewayResponse.Builder b = new ApiGatewayResponse.Builder();


    Map<String, String> testMap = new Map<String, String>() {
        @Override
        public int size() {
            return 0;
        }

        @Override
        public boolean isEmpty() {
            return false;
        }

        @Override
        public boolean containsKey(Object key) {
            return false;
        }

        @Override
        public boolean containsValue(Object value) {
            return false;
        }

        @Override
        public String get(Object key) {
            return null;
        }

        @Nullable
        @Override
        public String put(String key, String value) {
            return null;
        }

        @Override
        public String remove(Object key) {
            return null;
        }

        @Override
        public void putAll(@NotNull Map<? extends String, ? extends String> m) {

        }

        @Override
        public void clear() {

        }

        @NotNull
        @Override
        public Set<String> keySet() {
            return null;
        }

        @NotNull
        @Override
        public Collection<String> values() {
            return null;
        }

        @NotNull
        @Override
        public Set<Entry<String, String>> entrySet() {
            return null;
        }

        @Override
        public boolean equals(Object o) {
            return false;
        }

        @Override
        public int hashCode() {
            return 0;
        }
    };

    ApiGatewayResponse newApi = new ApiGatewayResponse(1, "placeholder", testMap, true);


    @Test
    public void ApiGatewayResponseTest() {
        assertThat(newApi).isNotNull();
        assertThat( 1 == newApi.getStatusCode());
        assertEquals(1, newApi.getStatusCode());
        assertEquals("placeholder", newApi.getBody());
        assertThat(testMap).isNotNull();
        assertEquals(true, newApi.isIsBase64Encoded());
    }

    @Test
    public void BuilderTest() {
        assertThat(b).isNotNull();
        assertThat(b.setStatusCode(2)).isNotNull();

    }

    @Test
    public void buildTest() {
        assertThat(b.build()).isNotNull();
    }
}
