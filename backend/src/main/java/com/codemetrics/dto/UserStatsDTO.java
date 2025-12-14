package com.codemetrics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserStatsDTO {
    private String handle;
    private Integer rating;
    private Integer maxRating;
    private String rank;
    private String maxRank;
    private String country;
    private String organization;
    private String avatarUrl;
    private Long problemsSolved;
    private Integer contribution;
    private Integer friendOfCount;
}
