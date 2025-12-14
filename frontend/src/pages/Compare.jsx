import React, { useState } from 'react';
import { getUserStats, getProblemStats } from '../services/api';
import { Search, Trophy, CheckCircle, Target, ArrowRight } from 'lucide-react';

const Compare = () => {
    const [handle1, setHandle1] = useState('');
    const [handle2, setHandle2] = useState('');
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCompare = async (e) => {
        e.preventDefault();
        if (!handle1 || !handle2) {
            setError("Please enter two handles to compare");
            return;
        }

        setLoading(true);
        setError(null);
        setData1(null);
        setData2(null);

        try {
            const [user1, stats1, user2, stats2] = await Promise.all([
                getUserStats(handle1),
                getProblemStats(handle1),
                getUserStats(handle2),
                getProblemStats(handle2)
            ]);

            setData1({ user: user1, stats: stats1 });
            setData2({ user: user2, stats: stats2 });
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data. Please check handles and try again.");
        } finally {
            setLoading(false);
        }
    };

    const StatRow = ({ label, value1, value2, highlightHigher = false }) => {
        const isV1Higher = Number(value1) > Number(value2);
        const isV2Higher = Number(value2) > Number(value1);

        const getStyle = (isHigher) => highlightHigher && isHigher ? { color: 'var(--success-green)', fontWeight: 'bold' } : {};

        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px 1fr', gap: '1rem', padding: '1rem', borderBottom: '1px solid var(--border-color)', alignItems: 'center' }}>
                <div style={{ textAlign: 'right', ...getStyle(isV1Higher) }}>{value1}</div>
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase' }}>{label}</div>
                <div style={{ textAlign: 'left', ...getStyle(isV2Higher) }}>{value2}</div>
            </div>
        );
    };

    return (
        <div className="container" style={{ marginTop: '2rem', paddingBottom: '3rem' }}>

            <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem 0' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Compare Profiles</h1>
                <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                    Put two competitive programmers side-by-side to see who comes out on top.
                    Compare ratings, max ranks, problem solving counts, and contribution scores in a single view.
                </p>
            </div>

            {/* Inputs */}
            <form onSubmit={handleCompare} className="card" style={{ maxWidth: '800px', margin: '0 auto 2rem auto', padding: '2rem' }}>
                <div className="grid grid-cols-2" style={{ gap: '2rem', alignItems: 'center' }}>
                    <div className="input-group">
                        <label className="input-label">First Handle</label>
                        <input
                            type="text"
                            className="input"
                            value={handle1}
                            onChange={(e) => setHandle1(e.target.value)}
                            placeholder="e.g. tourist"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="input-label">Second Handle</label>
                        <input
                            type="text"
                            className="input"
                            value={handle2}
                            onChange={(e) => setHandle2(e.target.value)}
                            placeholder="e.g. Petr"
                            required
                        />
                    </div>
                </div>
                {error && <div className="text-danger text-center mb-2">{error}</div>}
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                    {loading ? 'Loading...' : 'Compare Users'}
                </button>
            </form>

            {/* Comparison View */}
            {data1 && data2 && (
                <div className="card">
                    {/* Headers */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px 1fr', gap: '1rem', padding: '1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card-hover)', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                        <div className="text-center">
                            <img
                                src={data1.user.avatar}
                                alt={data1.user.handle}
                                style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '0.5rem', border: '2px solid var(--border-color)' }}
                            />
                            <h2 style={{ fontSize: '1.5rem' }}>{data1.user.handle}</h2>
                            <span className="badge" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>{data1.user.rank || 'Unrated'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>VS</span>
                        </div>
                        <div className="text-center">
                            <img
                                src={data2.user.avatar}
                                alt={data2.user.handle}
                                style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '0.5rem', border: '2px solid var(--border-color)' }}
                            />
                            <h2 style={{ fontSize: '1.5rem' }}>{data2.user.handle}</h2>
                            <span className="badge" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>{data2.user.rank || 'Unrated'}</span>
                        </div>
                    </div>

                    {/* Stats Rows */}
                    <StatRow
                        label="Current Rating"
                        value1={data1.user.rating || 0}
                        value2={data2.user.rating || 0}
                        highlightHigher
                    />
                    <StatRow
                        label="Max Rating"
                        value1={data1.user.maxRating || 0}
                        value2={data2.user.maxRating || 0}
                        highlightHigher
                    />
                    <StatRow
                        label="Total Solved"
                        value1={data1.stats.totalSolved || 0}
                        value2={data2.stats.totalSolved || 0}
                        highlightHigher
                    />
                    <StatRow
                        label="Friend of Count"
                        value1={data1.user.friendOfCount || 0}
                        value2={data2.user.friendOfCount || 0}
                        highlightHigher
                    />
                    <StatRow
                        label="Contribution"
                        value1={data1.user.contribution || 0}
                        value2={data2.user.contribution || 0}
                        highlightHigher
                    />
                </div>
            )}
        </div>
    );
};

export default Compare;
