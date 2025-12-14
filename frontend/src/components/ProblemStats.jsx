import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const ProblemStats = ({ problemStats }) => {
    if (!problemStats) {
        return null;
    }

    const difficultyData = Object.entries(problemStats.byDifficulty || {}).map(([name, value]) => ({
        name,
        value,
    }));

    const tagsData = Object.entries(problemStats.byTags || {})
        .slice(0, 8)
        .map(([name, value]) => ({
            name,
            value,
        }));

    const COLORS = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899'];

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
                    <p style={{ fontWeight: '600' }}>
                        {payload[0].name}: {payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-2">
            {/* Difficulty Distribution */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Problems by Difficulty</h3>
                </div>
                {difficultyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={difficultyData}>
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
                            <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-muted text-center" style={{ padding: '3rem 0' }}>
                        No data available
                    </p>
                )}
            </div>

            {/* Tags Distribution */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Top Problem Tags</h3>
                </div>
                {tagsData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={tagsData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {tagsData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-muted text-center" style={{ padding: '3rem 0' }}>
                        No data available
                    </p>
                )}
            </div>

            {/* Stats Summary */}
            <div className="card" style={{ gridColumn: 'span 2' }}>
                <div className="grid grid-cols-3">
                    <div className="stat-card">
                        <p className="stat-label">Total Solved</p>
                        <p className="stat-value">{problemStats.totalSolved || 0}</p>
                    </div>
                    <div className="stat-card">
                        <p className="stat-label">Acceptance Rate</p>
                        <p className="stat-value" style={{ color: 'var(--success-green)' }}>
                            {problemStats.acceptanceRate || 0}%
                        </p>
                    </div>
                    <div className="stat-card">
                        <p className="stat-label">Unique Tags</p>
                        <p className="stat-value">
                            {Object.keys(problemStats.byTags || {}).length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemStats;
