import React from 'react';
import { formatDate, getVerdictColor, truncateText } from '../utils/helpers';

const SubmissionTable = ({ submissions }) => {
    if (!submissions || submissions.length === 0) {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Recent Submissions</h3>
                </div>
                <p className="text-muted text-center" style={{ padding: '3rem 0' }}>
                    No submissions available
                </p>
            </div>
        );
    }

    const recentSubmissions = submissions.slice(0, 20);

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Recent Submissions</h3>
                <span className="badge badge-primary">
                    {recentSubmissions.length} Submissions
                </span>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Problem</th>
                            <th>Rating</th>
                            <th>Verdict</th>
                            <th>Language</th>
                            <th>Time</th>
                            <th>Memory</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentSubmissions.map((submission, index) => (
                            <tr key={index}>
                                <td>
                                    <span style={{ fontWeight: '500' }}>
                                        {truncateText(submission.problemName, 30)}
                                    </span>
                                </td>
                                <td>
                                    {submission.problemRating > 0 ? (
                                        <span className="badge badge-primary">
                                            {submission.problemRating}
                                        </span>
                                    ) : (
                                        <span className="text-muted">-</span>
                                    )}
                                </td>
                                <td>
                                    <span
                                        style={{
                                            color: getVerdictColor(submission.verdict),
                                            fontWeight: '500',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {submission.verdict}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        {truncateText(submission.programmingLanguage, 20)}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ fontSize: '0.875rem' }}>
                                        {submission.timeConsumedMillis > 0
                                            ? `${submission.timeConsumedMillis} ms`
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ fontSize: '0.875rem' }}>
                                        {submission.memoryConsumedBytes > 0
                                            ? `${(submission.memoryConsumedBytes / 1024).toFixed(0)} KB`
                                            : '-'}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                        {formatDate(submission.creationTimeSeconds)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmissionTable;
