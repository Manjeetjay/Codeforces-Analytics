package com.codemetrics.service;

import com.codemetrics.dto.ProblemStatsDTO;
import com.codemetrics.dto.RatingHistoryDTO;
import com.codemetrics.dto.UserStatsDTO;
import com.codemetrics.model.User;
import com.codemetrics.model.UserProfile;
import com.codemetrics.repository.UserProfileRepository;
import com.codemetrics.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final CodeforcesApiService codeforcesApiService;
    private final MetricsService metricsService;

    @Transactional
    public UserStatsDTO getUserStats(String handle) {
        // Get or create user
        User user = userRepository.findByHandle(handle)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setHandle(handle);
                    return userRepository.save(newUser);
                });

        // Fetch data from Codeforces API
        Map<String, Object> userInfo = codeforcesApiService.getUserInfo(handle);
        List<Map<String, Object>> submissions = codeforcesApiService.getUserSubmissions(handle);

        // Calculate problem stats
        ProblemStatsDTO problemStats = metricsService.calculateProblemStats(user, submissions);

        // Save/update user profile
        saveUserProfile(user, userInfo);

        // Build and return stats
        return metricsService.buildUserStats(user, userInfo, problemStats.getTotalSolved());
    }

    public List<RatingHistoryDTO> getRatingHistory(String handle) {
        return codeforcesApiService.getRatingHistory(handle);
    }

    public ProblemStatsDTO getProblemStats(String handle) {
        User user = userRepository.findByHandle(handle)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Map<String, Object>> submissions = codeforcesApiService.getUserSubmissions(handle);
        return metricsService.calculateProblemStats(user, submissions);
    }

    public List<Map<String, Object>> getRecentSubmissions(String handle) {
        return codeforcesApiService.getUserSubmissions(handle);
    }

    private void saveUserProfile(User user, Map<String, Object> userInfo) {
        UserProfile profile = userProfileRepository.findByUser(user)
                .orElse(new UserProfile());

        profile.setUser(user);
        profile.setRating((Integer) userInfo.get("rating"));
        profile.setMaxRating((Integer) userInfo.get("maxRating"));
        profile.setRank((String) userInfo.get("rank"));
        profile.setMaxRank((String) userInfo.get("maxRank"));
        profile.setCountry((String) userInfo.get("country"));
        profile.setOrganization((String) userInfo.get("organization"));
        profile.setContribution((Integer) userInfo.get("contribution"));
        profile.setFriendOfCount((Integer) userInfo.get("friendOfCount"));
        profile.setAvatarUrl((String) userInfo.get("avatar"));
        profile.setCachedAt(LocalDateTime.now());

        userProfileRepository.save(profile);
    }
}
