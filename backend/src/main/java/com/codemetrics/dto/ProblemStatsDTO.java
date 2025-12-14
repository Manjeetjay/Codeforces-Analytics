package com.codemetrics.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemStatsDTO {
    private Map<String, Integer> byDifficulty;
    private Map<String, Integer> byTags;
    private Long totalSolved;
    private Double acceptanceRate;
}
