import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserStats, getRatingHistory, getProblemStats, getSubmissions } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import UserCard from '../components/UserCard';
import RatingChart from '../components/RatingChart';
import ProblemStats from '../components/ProblemStats';
import SubmissionTable from '../components/SubmissionTable';

const Dashboard = () => {
    const { handle } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [ratingHistory, setRatingHistory] = useState([]);
    const [problemStats, setProblemStats] = useState(null);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchData();
    }, [handle]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const [stats, rating, problems, subs] = await Promise.all([
                getUserStats(handle),
                getRatingHistory(handle),
                getProblemStats(handle),
                getSubmissions(handle),
            ]);

            setUserStats(stats);
            setRatingHistory(rating);
            setProblemStats(problems);
            setSubmissions(subs);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.response?.data?.error || 'Failed to fetch user data. Please check the handle and try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message={`Loading data for ${handle}...`} />;
    }

    if (error) {
        return (
            <div className="container" style={{ paddingTop: '4rem' }}>
                <ErrorMessage
                    title="Failed to Load Data"
                    message={error}
                    onRetry={fetchData}
                />
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>
                        ← Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <button className="btn btn-secondary" onClick={() => navigate('/')}>
                    ← Back to Search
                </button>
                <button className="btn btn-primary" onClick={fetchData}>
                    🔄 Refresh Data
                </button>
            </div>

            {/* User Card */}
            <div className="mb-4">
                <UserCard userStats={userStats} />
            </div>

            {/* Rating Chart */}
            <div className="mb-4">
                <RatingChart ratingHistory={ratingHistory} />
            </div>

            {/* Problem Stats */}
            <div className="mb-4">
                <ProblemStats problemStats={problemStats} />
            </div>

            {/* Submissions Table */}
            <div className="mb-4">
                <SubmissionTable submissions={submissions} />
            </div>
        </div>
    );
};

export default Dashboard;
