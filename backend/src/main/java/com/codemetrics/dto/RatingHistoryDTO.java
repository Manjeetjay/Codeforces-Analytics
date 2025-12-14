package com.codemetrics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingHistoryDTO {
    private Long contestId;
    private String contestName;
    private Integer rank;
    private Integer oldRating;
    private Integer newRating;
    private Long timestamp;
}
