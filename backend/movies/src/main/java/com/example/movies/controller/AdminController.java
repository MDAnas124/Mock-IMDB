package com.example.movies.controller;

import com.example.movies.dto.MovieDTO;
import com.example.movies.model.Movie;
import com.example.movies.model.MovieSource;
import com.example.movies.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private MovieRepository movieRepository;

    @PostMapping("/movies")
    public ResponseEntity<?> addMovie(@RequestBody MovieDTO movieDTO) {
        Movie movie = new Movie();
        movie.setTitle(movieDTO.getTitle());
        movie.setDescription(movieDTO.getDescription());
        movie.setReleaseDate(movieDTO.getReleaseDate());
        movie.setGenre(movieDTO.getGenre());
        movie.setPosterPath(movieDTO.getPosterPath());
        movie.setRating(movieDTO.getRating());
        movie.setSource(MovieSource.MANUAL);
        movie.setCreatedBy(movieDTO.getCreatedBy());

        movieRepository.save(movie);
        return ResponseEntity.ok("Movie added manually by Admin");
    }

    @PutMapping("/movies/{id}")
    public ResponseEntity<?> updateMovie(@PathVariable Integer id, @RequestBody MovieDTO movieDTO) {
        Optional<Movie> movieOpt = movieRepository.findById(id);
        if (movieOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Movie movie = movieOpt.get();
        movie.setTitle(movieDTO.getTitle());
        movie.setDescription(movieDTO.getDescription());
        movie.setReleaseDate(movieDTO.getReleaseDate());
        movie.setGenre(movieDTO.getGenre());
        movie.setPosterPath(movieDTO.getPosterPath());
        movie.setRating(movieDTO.getRating());
        // Source remains MANUAL for admin edits
        movie.setCreatedBy(movieDTO.getCreatedBy());

        movieRepository.save(movie);
        return ResponseEntity.ok("Movie updated successfully");
    }

    @GetMapping("/movies")
    public List<Movie> getManualMovies() {
        return movieRepository.findBySource(MovieSource.MANUAL);
    }
}
