package com.example.movies.repository;

import com.example.movies.model.Movie;
import com.example.movies.model.MovieSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findBySource(MovieSource source);
    List<Movie> findByTitleContainingIgnoreCase(String title);
}
