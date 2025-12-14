package com.codemetrics.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private Integer rating;

    @Column(name = "max_rating")
    private Integer maxRating;

    private String rank;

    @Column(name = "max_rank")
    private String maxRank;

    private String country;

    private String organization;

    private Integer contribution;

    @Column(name = "friend_of_count")
    private Integer friendOfCount;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "cached_at")
    private LocalDateTime cachedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        cachedAt = LocalDateTime.now();
    }
}
