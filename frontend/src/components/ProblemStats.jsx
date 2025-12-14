import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { PieChart as PieIcon, BarChart as BarIcon } from 'lucide-react';

const ProblemStats = ({ problemStats }) => {
    const [difficultyChartType, setDifficultyChartType] = useState('bar');
    const [tagsChartType, setTagsChartType] = useState('pie');

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

    const COLORS = ['#171717', '#404040', '#737373', '#a3a3a3', '#d4d4d4', '#e5e5e5', '#f5f5f5', '#262626']; // Monochrome palette

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

    const renderChart = (type, data, dataKey = 'value') => {
        if (type === 'bar') {
            return (
                <BarChart data={data}>
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
                    <Bar dataKey={dataKey} fill="var(--text-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
            );
        }
        return (
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey={dataKey}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        );
    };

    const ToggleButton = ({ current, type, onClick }) => (
        <button
            onClick={() => onClick(type)}
            className={`btn ${current === type ? 'btn-secondary' : ''}`}
            style={{
                padding: '0.25rem',
                background: current === type ? 'var(--bg-card-hover)' : 'transparent',
                border: current === type ? '1px solid var(--border-color)' : 'none'
            }}
            title={`Switch to ${type} chart`}
        >
            {type === 'bar' ? <BarIcon size={16} /> : <PieIcon size={16} />}
        </button>
    );

    return (
        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
            {/* Difficulty Distribution */}
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Problems by Difficulty</h3>
                    <div className="flex gap-1">
                        <ToggleButton current={difficultyChartType} type="bar" onClick={setDifficultyChartType} />
                        <ToggleButton current={difficultyChartType} type="pie" onClick={setDifficultyChartType} />
                    </div>
                </div>
                {difficultyData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        {renderChart(difficultyChartType, difficultyData)}
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
                    <div className="flex gap-1">
                        <ToggleButton current={tagsChartType} type="bar" onClick={setTagsChartType} />
                        <ToggleButton current={tagsChartType} type="pie" onClick={setTagsChartType} />
                    </div>
                </div>
                {tagsData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        {renderChart(tagsChartType, tagsData)}
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
                        <p className="stat-value">
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
