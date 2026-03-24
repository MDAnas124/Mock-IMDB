package com.example.movies.controller;

import com.example.movies.model.Movie;
import com.example.movies.model.MovieSource;
import com.example.movies.repository.MovieRepository;
import com.example.movies.service.OmdbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private OmdbService omdbService;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable String id) {
        // First check local DB
        try {
            Integer localId = Integer.parseInt(id);
            Optional<Movie> movie = movieRepository.findById(localId);
            if (movie.isPresent()) return ResponseEntity.ok(movie.get());
        } catch (NumberFormatException e) {
            // Not a local ID, check OMDB by IMDB ID
        }

        Map<String, Object> omdbMovie = omdbService.getMovieById(id);
        if (omdbMovie != null && !"False".equals(omdbMovie.get("Response"))) {
            return ResponseEntity.ok(omdbMovie);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchMovies(@RequestParam String query) {
        // Return results from OMDB
        Map<String, Object> results = omdbService.searchMovies(query);
        // Rename 'Search' to 'results' for frontend compatibility if needed, 
        // but frontend expects res.data.results
        Map<String, Object> response = new HashMap<>();
        response.put("results", results.get("Search"));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/trending")
    public ResponseEntity<?> getTrendingMovies() {
        // Mocking trending with a search for 'Avengers' as requested by the user's sample
        Map<String, Object> results = omdbService.searchMovies("Avengers");
        Map<String, Object> response = new HashMap<>();
        response.put("results", results.get("Search"));
        return ResponseEntity.ok(response);
    }
}
