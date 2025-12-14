package com.codemetrics.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "submissions", indexes = {
        @Index(name = "idx_user_verdict", columnList = "user_id,verdict"),
        @Index(name = "idx_problem_rating", columnList = "problem_rating")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "submission_id", unique = true)
    private Long submissionId;

    @Column(name = "problem_name", length = 200)
    private String problemName;

    @Column(name = "problem_rating")
    private Integer problemRating;

    @Column(name = "problem_tags", length = 1000)
    private String problemTags;

    private String verdict;

    @Column(name = "programming_language")
    private String programmingLanguage;

    @Column(name = "time_consumed_millis")
    private Integer timeConsumedMillis;

    @Column(name = "memory_consumed_bytes")
    private Long memoryConsumedBytes;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;
}
