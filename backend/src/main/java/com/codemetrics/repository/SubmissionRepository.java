package com.codemetrics.repository;

import com.codemetrics.model.Submission;
import com.codemetrics.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserOrderBySubmittedAtDesc(User user);

    @Query("SELECT COUNT(DISTINCT s.problemName) FROM Submission s WHERE s.user = ?1 AND s.verdict = 'OK'")
    Long countSolvedProblems(User user);

    @Query("SELECT s FROM Submission s WHERE s.user = ?1 AND s.verdict = 'OK' ORDER BY s.submittedAt DESC")
    List<Submission> findAcceptedSubmissions(User user);
}
