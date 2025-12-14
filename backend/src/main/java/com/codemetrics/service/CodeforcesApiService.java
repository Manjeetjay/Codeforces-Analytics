package com.codemetrics.service;

import com.codemetrics.dto.RatingHistoryDTO;
import com.codemetrics.exception.CodeforcesApiException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class CodeforcesApiService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${codeforces.api.base-url}")
    private String baseUrl;

    @Value("${codeforces.api.rate-limit-delay}")
    private long rateLimitDelay;

    public CodeforcesApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
        this.objectMapper = new ObjectMapper();
    }

    @Cacheable(value = "userInfo", key = "#handle")
    public Map<String, Object> getUserInfo(String handle) {
        try {
            Thread.sleep(rateLimitDelay);
            String url = baseUrl + "/user.info?handles=" + handle;
            String response = restTemplate.getForObject(url, String.class);

            JsonNode root = objectMapper.readTree(response);

            if (!"OK".equals(root.get("status").asText())) {
                throw new CodeforcesApiException("User not found: " + handle);
            }

            JsonNode userNode = root.get("result").get(0);
            Map<String, Object> userInfo = new HashMap<>();

            userInfo.put("handle", userNode.get("handle").asText());
            userInfo.put("rating", userNode.has("rating") ? userNode.get("rating").asInt() : 0);
            userInfo.put("maxRating", userNode.has("maxRating") ? userNode.get("maxRating").asInt() : 0);
            userInfo.put("rank", userNode.has("rank") ? userNode.get("rank").asText() : "unrated");
            userInfo.put("maxRank", userNode.has("maxRank") ? userNode.get("maxRank").asText() : "unrated");
            userInfo.put("country", userNode.has("country") ? userNode.get("country").asText() : "");
            userInfo.put("organization", userNode.has("organization") ? userNode.get("organization").asText() : "");
            userInfo.put("contribution", userNode.has("contribution") ? userNode.get("contribution").asInt() : 0);
            userInfo.put("friendOfCount", userNode.has("friendOfCount") ? userNode.get("friendOfCount").asInt() : 0);
            userInfo.put("avatar", userNode.has("titlePhoto") ? userNode.get("titlePhoto").asText() : "");

            return userInfo;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new CodeforcesApiException("Request interrupted", e);
        } catch (Exception e) {
            log.error("Error fetching user info for handle: {}", handle, e);
            throw new CodeforcesApiException("Failed to fetch user information: " + e.getMessage(), e);
        }
    }

    @Cacheable(value = "ratingHistory", key = "#handle")
    public List<RatingHistoryDTO> getRatingHistory(String handle) {
        try {
            Thread.sleep(rateLimitDelay);
            String url = baseUrl + "/user.rating?handle=" + handle;
            String response = restTemplate.getForObject(url, String.class);

            JsonNode root = objectMapper.readTree(response);

            if (!"OK".equals(root.get("status").asText())) {
                throw new CodeforcesApiException("Failed to fetch rating history");
            }

            List<RatingHistoryDTO> history = new ArrayList<>();
            JsonNode results = root.get("result");

            for (JsonNode contest : results) {
                RatingHistoryDTO dto = new RatingHistoryDTO();
                dto.setContestId(contest.get("contestId").asLong());
                dto.setContestName(contest.get("contestName").asText());
                dto.setRank(contest.get("rank").asInt());
                dto.setOldRating(contest.get("oldRating").asInt());
                dto.setNewRating(contest.get("newRating").asInt());
                dto.setTimestamp(contest.get("ratingUpdateTimeSeconds").asLong() * 1000);
                history.add(dto);
            }

            return history;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new CodeforcesApiException("Request interrupted", e);
        } catch (Exception e) {
            log.error("Error fetching rating history for handle: {}", handle, e);
            throw new CodeforcesApiException("Failed to fetch rating history: " + e.getMessage(), e);
        }
    }

    @Cacheable(value = "userSubmissions", key = "#handle")
    public List<Map<String, Object>> getUserSubmissions(String handle) {
        try {
            Thread.sleep(rateLimitDelay);
            String url = baseUrl + "/user.status?handle=" + handle + "&from=1&count=100";
            String response = restTemplate.getForObject(url, String.class);

            JsonNode root = objectMapper.readTree(response);

            if (!"OK".equals(root.get("status").asText())) {
                throw new CodeforcesApiException("Failed to fetch submissions");
            }

            List<Map<String, Object>> submissions = new ArrayList<>();
            JsonNode results = root.get("result");

            for (JsonNode sub : results) {
                Map<String, Object> submission = new HashMap<>();
                submission.put("id", sub.get("id").asLong());

                JsonNode problem = sub.get("problem");
                submission.put("problemName", problem.get("name").asText());
                submission.put("problemRating", problem.has("rating") ? problem.get("rating").asInt() : 0);

                // Extract tags
                List<String> tags = new ArrayList<>();
                if (problem.has("tags")) {
                    for (JsonNode tag : problem.get("tags")) {
                        tags.add(tag.asText());
                    }
                }
                submission.put("tags", String.join(",", tags));

                submission.put("verdict", sub.get("verdict").asText());
                submission.put("programmingLanguage", sub.get("programmingLanguage").asText());
                submission.put("timeConsumedMillis",
                        sub.has("timeConsumedMillis") ? sub.get("timeConsumedMillis").asInt() : 0);
                submission.put("memoryConsumedBytes",
                        sub.has("memoryConsumedBytes") ? sub.get("memoryConsumedBytes").asLong() : 0);
                submission.put("creationTimeSeconds", sub.get("creationTimeSeconds").asLong() * 1000);

                submissions.add(submission);
            }

            return submissions;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new CodeforcesApiException("Request interrupted", e);
        } catch (Exception e) {
            log.error("Error fetching submissions for handle: {}", handle, e);
            throw new CodeforcesApiException("Failed to fetch submissions: " + e.getMessage(), e);
        }
    }
}
