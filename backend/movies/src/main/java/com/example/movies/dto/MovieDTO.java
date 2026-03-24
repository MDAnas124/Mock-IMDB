package com.example.movies.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO {
    private String title;
    private String description;
    private LocalDate releaseDate;
    private String genre;
    private String posterPath;
    private Float rating;
    private Integer createdBy; // Reference to the user ID
}
