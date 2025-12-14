import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { formatDate } from '../utils/helpers';

const RatingChart = ({ ratingHistory }) => {
    if (!ratingHistory || ratingHistory.length === 0) {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Rating History</h3>
                </div>
                <p className="text-muted text-center" style={{ padding: '3rem 0' }}>
                    No rating history available
                </p>
            </div>
        );
    }

    const data = ratingHistory.map((contest) => ({
        name: formatDate(contest.timestamp),
        rating: contest.newRating,
        contestName: contest.contestName,
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '0.75rem',
                    }}
                >
                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                        Rating: {payload[0].value}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        {payload[0].payload.contestName}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {payload[0].payload.name}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Rating History</h3>
                <span className="badge badge-primary">
                    {ratingHistory.length} Contests
                </span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                        dataKey="name"
                        stroke="var(--text-muted)"
                        style={{ fontSize: '0.75rem' }}
                        tick={{ fill: 'var(--text-muted)' }}
                    />
                    <YAxis
                        stroke="var(--text-muted)"
                        style={{ fontSize: '0.75rem' }}
                        tick={{ fill: 'var(--text-muted)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="rating"
                        stroke="#2563eb"
                        strokeWidth={2}
                        fill="url(#colorRating)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RatingChart;
