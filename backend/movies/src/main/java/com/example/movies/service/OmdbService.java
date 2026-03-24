package com.example.movies.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@Service
public class OmdbService {

    @Value("${omdb.api.key}")
    private String apiKey;

    @Value("${omdb.api.url}")
    private String apiUrl;

    @Autowired
    private RestTemplate restTemplate;

    public Map<String, Object> searchMovies(String query) {
        String url = String.format("%s?s=%s&apikey=%s", apiUrl, query, apiKey);
        try {
            return restTemplate.getForObject(url, Map.class);
        } catch (Exception e) {
            return Map.of("Error", e.getMessage());
        }
    }

    public Map<String, Object> getMovieByTitle(String title) {
        String url = String.format("%s?t=%s&apikey=%s", apiUrl, title, apiKey);
        try {
            return restTemplate.getForObject(url, Map.class);
        } catch (Exception e) {
            return Map.of("Error", e.getMessage());
        }
    }

    public Map<String, Object> getMovieById(String imdbId) {
        String url = String.format("%s?i=%s&apikey=%s", apiUrl, imdbId, apiKey);
        try {
            return restTemplate.getForObject(url, Map.class);
        } catch (Exception e) {
            return Map.of("Error", e.getMessage());
        }
    }
}
