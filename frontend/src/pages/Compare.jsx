import React, { useState } from 'react';
import { getUserStats, getProblemStats, getRatingHistory } from '../services/api';
import { Search, Trophy, CheckCircle, Target, ArrowRight, TrendingUp, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Compare = () => {
    const [handle1, setHandle1] = useState('');
    const [handle2, setHandle2] = useState('');
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const processChartData = (hist1, hist2, h1, h2) => {
        if (!hist1.length || !hist2.length) return null;

        const start1 = hist1[0].ratingUpdateTimeSeconds;
        const end1 = hist1[hist1.length - 1].ratingUpdateTimeSeconds;
        const start2 = hist2[0].ratingUpdateTimeSeconds;
        const end2 = hist2[hist2.length - 1].ratingUpdateTimeSeconds;

        const overlapStart = Math.max(start1, start2);
        const overlapEnd = Math.min(end1, end2);

        if (overlapStart > overlapEnd) {
            return null; // No overlap
        }

        // Create a map of timestamp -> data
        const dataMap = new Map();

        // Helper to add points within overlap
        const addPoints = (hist, handle) => {
            hist.forEach(entry => {
                const ts = entry.ratingUpdateTimeSeconds;
                if (ts >= overlapStart && ts <= overlapEnd) {
                    const date = new Date(ts * 1000).toLocaleDateString();
                    if (!dataMap.has(ts)) {
                        dataMap.set(ts, { date, timestamp: ts });
                    }
                    dataMap.get(ts)[handle] = entry.newRating;
                }
            });
        };

        addPoints(hist1, h1);
        addPoints(hist2, h2);

        // Convert map to array and sort by timestamp
        const combinedData = Array.from(dataMap.values()).sort((a, b) => a.timestamp - b.timestamp);

        // Find rating just before overlap for carry-over
        let lastH1 = hist1.filter(e => e.ratingUpdateTimeSeconds < overlapStart).pop()?.newRating || hist1[0]?.newRating;
        let lastH2 = hist2.filter(e => e.ratingUpdateTimeSeconds < overlapStart).pop()?.newRating || hist2[0]?.newRating;

        return combinedData.map(point => {
            if (point[h1] !== undefined) lastH1 = point[h1];
            if (point[h2] !== undefined) lastH2 = point[h2];
            return {
                ...point,
                [h1]: lastH1,
                [h2]: lastH2
            };
        });
    };

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
        setChartData([]);

        try {
            const [user1, stats1, hist1, user2, stats2, hist2] = await Promise.all([
                getUserStats(handle1),
                getProblemStats(handle1),
                getRatingHistory(handle1),
                getUserStats(handle2),
                getProblemStats(handle2),
                getRatingHistory(handle2)
            ]);

            setData1({ user: user1, stats: stats1 });
            setData2({ user: user2, stats: stats2 });

            const processed = processChartData(hist1, hist2, user1.handle, user2.handle);
            setChartData(processed);

        } catch (err) {
            console.error(err);
            setError("Failed to fetch data. Please check handles and try again.");
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ label, value1, value2, suffix = '' }) => {
        const v1 = Number(value1) || 0;
        const v2 = Number(value2) || 0;
        const total = v1 + v2 || 1;
        const p1 = (v1 / total) * 100;
        const p2 = (v2 / total) * 100;
        const winner = v1 > v2 ? 1 : v2 > v1 ? 2 : 0;

        // Styles
        const color1 = winner === 1 ? 'var(--success-green)' : winner === 2 ? 'var(--danger-red)' : 'var(--text-muted)';
        const color2 = winner === 2 ? 'var(--success-green)' : winner === 1 ? 'var(--danger-red)' : 'var(--text-muted)';
        const opacity1 = winner === 0 ? 0.5 : 1;
        const opacity2 = winner === 0 ? 0.5 : 1;

        return (
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 'bold', color: color1 }}>
                        {value1}{suffix}
                    </div>
                    <div className="text-muted text-sm uppercase tracking-wider">{label}</div>
                    <div style={{ fontWeight: 'bold', color: color2 }}>
                        {value2}{suffix}
                    </div>
                </div>
                <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', gap: '4px' }}>
                    <div style={{ width: `${p1}%`, background: color1, opacity: opacity1 }}></div>
                    <div style={{ width: `${p2}%`, background: color2, opacity: opacity2 }}></div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '3rem', position: 'relative' }}>
            {/* Background Effects */}
            <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, zIndex: -1, opacity: 0.3 }} />

            <div className="container" style={{ paddingTop: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '2rem 0' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        Compare <span className="text-gradient">Profiles</span>
                    </h1>
                    <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                        Analyze rating trajectories, verify competitive strengths, and settle the debate.
                    </p>
                </div>

                {/* Inputs */}
                <form onSubmit={handleCompare} className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto 3rem auto', padding: '2rem', display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            className="input"
                            value={handle1}
                            onChange={(e) => setHandle1(e.target.value)}
                            placeholder="First Handle (e.g. tourist)"
                            required
                            style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.1)' }}
                        />
                        <input
                            type="text"
                            className="input"
                            value={handle2}
                            onChange={(e) => setHandle2(e.target.value)}
                            placeholder="Second Handle (e.g. Petr)"
                            required
                            style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.1)' }}
                        />
                    </div>
                    {error && <div className="text-danger text-center">{error}</div>}
                    <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={loading}>
                        {loading ? 'Analyzing...' : 'Run Comparison'} <ArrowRight size={20} />
                    </button>
                </form>

                {/* Comparison View */}
                {data1 && data2 && (
                    <div className="animate-fade-in-up">

                        {/* Headers */}
                        <div className="grid grid-cols-2 gap-4 mb-4" style={{ alignItems: 'center' }}>
                            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid var(--primary-blue-light)' }}>
                                <img
                                    src={data1.user.avatar}
                                    alt={data1.user.handle}
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem', border: '4px solid var(--bg-card)' }}
                                    className="shadow-lg"
                                />
                                <h2 style={{ fontSize: '2rem', lineHeight: 1 }}>{data1.user.handle}</h2>
                                <div className="text-muted">{data1.user.rank || 'Unrated'}</div>
                            </div>

                            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderTop: '4px solid var(--success-green)' }}>
                                <img
                                    src={data2.user.avatar}
                                    alt={data2.user.handle}
                                    style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem', border: '4px solid var(--bg-card)' }}
                                    className="shadow-lg"
                                />
                                <h2 style={{ fontSize: '2rem', lineHeight: 1 }}>{data2.user.handle}</h2>
                                <div className="text-muted">{data2.user.rank || 'Unrated'}</div>
                            </div>
                        </div>

                        {/* Chart Section */}
                        <div className="glass-panel mb-4" style={{ padding: '2rem', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h3 className="mb-4" style={{ fontSize: '1.25rem' }}>Rating History (Overlapping Period)</h3>
                            {chartData ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                        <XAxis
                                            dataKey="date"
                                            stroke="var(--text-muted)"
                                            tick={{ fill: 'var(--text-muted)' }}
                                            minTickGap={50}
                                        />
                                        <YAxis
                                            stroke="var(--text-muted)"
                                            tick={{ fill: 'var(--text-muted)' }}
                                            domain={['dataMin - 100', 'dataMax + 100']}
                                        />
                                        <Tooltip
                                            contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                                            itemStyle={{ color: 'var(--text-primary)' }}
                                        />
                                        <Legend />
                                        <Line
                                            type="stepAfter"
                                            dataKey={data1.user.handle}
                                            stroke="var(--primary-blue-light)"
                                            strokeWidth={2}
                                            dot={false}
                                            connectNulls
                                        />
                                        <Line
                                            type="stepAfter"
                                            dataKey={data2.user.handle}
                                            stroke="var(--success-green)"
                                            strokeWidth={2}
                                            dot={false}
                                            connectNulls
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div style={{ textAlign: 'center', color: 'var(--text-muted)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <Minus size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                                    <div style={{ fontSize: '1.25rem' }}>No Overlapping Time Use Periods</div>
                                    <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>These users have never competed in the same timeframe.</div>
                                </div>
                            )}
                        </div>

                        {/* Detailed Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex-col gap-4">
                                <StatCard label="Current Rating" value1={data1.user.rating} value2={data2.user.rating} />
                                <StatCard label="Max Rating" value1={data1.user.maxRating} value2={data2.user.maxRating} />
                                <StatCard label="Friend Count" value1={data1.user.friendOfCount} value2={data2.user.friendOfCount} />
                            </div>
                            <div className="flex-col gap-4">
                                <StatCard label="Total Solved" value1={data1.stats.totalSolved} value2={data2.stats.totalSolved} />
                                <StatCard label="Contribution" value1={data1.user.contribution} value2={data2.user.contribution} />
                                {/* Add more stats as they become available in API */}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Compare;
