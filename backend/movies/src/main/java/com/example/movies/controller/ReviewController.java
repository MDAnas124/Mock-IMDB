package com.example.movies.controller;

import com.example.movies.dto.ReviewDTO;
import com.example.movies.model.Movie;
import com.example.movies.model.Review;
import com.example.movies.model.User;
import com.example.movies.repository.MovieRepository;
import com.example.movies.repository.ReviewRepository;
import com.example.movies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{movieId}/reviews")
    public ResponseEntity<?> addReview(@PathVariable Integer movieId, @RequestBody ReviewDTO reviewDTO) {
        Optional<Movie> movieOpt = movieRepository.findById(movieId);
        Optional<User> userOpt = userRepository.findById(reviewDTO.getUserId());

        if (movieOpt.isEmpty()) return ResponseEntity.status(404).body("Movie not found");
        if (userOpt.isEmpty()) return ResponseEntity.status(404).body("User not found");

        Review review = new Review();
        review.setMovie(movieOpt.get());
        review.setUser(userOpt.get());
        review.setReviewText(reviewDTO.getReviewText());
        review.setRating(reviewDTO.getRating());

        reviewRepository.save(review);
        return ResponseEntity.ok("Review added successfully");
    }

    @GetMapping("/{movieId}/reviews")
    public List<Review> getReviews(@PathVariable Integer movieId) {
        return reviewRepository.findByMovieId(movieId);
    }
}
