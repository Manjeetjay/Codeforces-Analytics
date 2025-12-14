package com.codemetrics.service;

import com.codemetrics.dto.ProblemStatsDTO;
import com.codemetrics.dto.UserStatsDTO;
import com.codemetrics.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MetricsService {

    public ProblemStatsDTO calculateProblemStats(User user, List<Map<String, Object>> submissions) {
        Map<String, Integer> byDifficulty = new HashMap<>();
        Map<String, Integer> byTags = new HashMap<>();

        Set<String> solvedProblems = new HashSet<>();
        long totalSubmissions = submissions.size();
        long acceptedSubmissions = 0;

        for (Map<String, Object> sub : submissions) {
            String verdict = (String) sub.get("verdict");

            if ("OK".equals(verdict)) {
                acceptedSubmissions++;
                String problemName = (String) sub.get("problemName");
                solvedProblems.add(problemName);

                // Group by difficulty
                Integer rating = (Integer) sub.get("problemRating");
                if (rating != null && rating > 0) {
                    String difficulty = getDifficultyLevel(rating);
                    byDifficulty.put(difficulty, byDifficulty.getOrDefault(difficulty, 0) + 1);
                }

                // Group by tags
                String tagsStr = (String) sub.get("tags");
                if (tagsStr != null && !tagsStr.isEmpty()) {
                    String[] tags = tagsStr.split(",");
                    for (String tag : tags) {
                        tag = tag.trim();
                        if (!tag.isEmpty()) {
                            byTags.put(tag, byTags.getOrDefault(tag, 0) + 1);
                        }
                    }
                }
            }
        }

        // Sort tags by count and take top 10
        Map<String, Integer> topTags = byTags.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(10)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new));

        double acceptanceRate = totalSubmissions > 0 ? (acceptedSubmissions * 100.0 / totalSubmissions) : 0.0;

        ProblemStatsDTO stats = new ProblemStatsDTO();
        stats.setByDifficulty(byDifficulty);
        stats.setByTags(topTags);
        stats.setTotalSolved((long) solvedProblems.size());
        stats.setAcceptanceRate(Math.round(acceptanceRate * 100.0) / 100.0);

        return stats;
    }

    public UserStatsDTO buildUserStats(User user, Map<String, Object> userInfo, Long problemsSolved) {
        UserStatsDTO stats = new UserStatsDTO();
        stats.setHandle((String) userInfo.get("handle"));
        stats.setRating((Integer) userInfo.get("rating"));
        stats.setMaxRating((Integer) userInfo.get("maxRating"));
        stats.setRank((String) userInfo.get("rank"));
        stats.setMaxRank((String) userInfo.get("maxRank"));
        stats.setCountry((String) userInfo.get("country"));
        stats.setOrganization((String) userInfo.get("organization"));
        stats.setAvatarUrl((String) userInfo.get("avatar"));
        stats.setContribution((Integer) userInfo.get("contribution"));
        stats.setFriendOfCount((Integer) userInfo.get("friendOfCount"));
        stats.setProblemsSolved(problemsSolved);

        return stats;
    }

    private String getDifficultyLevel(int rating) {
        if (rating < 1200)
            return "Beginner";
        if (rating < 1600)
            return "Easy";
        if (rating < 2000)
            return "Medium";
        if (rating < 2400)
            return "Hard";
        return "Expert";
    }
}
