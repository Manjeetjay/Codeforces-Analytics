package com.codemetrics.controller;

import com.codemetrics.dto.ProblemStatsDTO;
import com.codemetrics.dto.RatingHistoryDTO;
import com.codemetrics.dto.UserStatsDTO;
import com.codemetrics.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{handle}")
    public ResponseEntity<UserStatsDTO> getUserStats(@PathVariable String handle) {
        UserStatsDTO stats = userService.getUserStats(handle);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{handle}/rating-history")
    public ResponseEntity<List<RatingHistoryDTO>> getRatingHistory(@PathVariable String handle) {
        List<RatingHistoryDTO> history = userService.getRatingHistory(handle);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/{handle}/problem-stats")
    public ResponseEntity<ProblemStatsDTO> getProblemStats(@PathVariable String handle) {
        ProblemStatsDTO stats = userService.getProblemStats(handle);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{handle}/submissions")
    public ResponseEntity<List<Map<String, Object>>> getSubmissions(@PathVariable String handle) {
        List<Map<String, Object>> submissions = userService.getRecentSubmissions(handle);
        return ResponseEntity.ok(submissions);
    }
}
