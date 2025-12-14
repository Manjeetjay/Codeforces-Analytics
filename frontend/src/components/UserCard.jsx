import React from 'react';
import { formatNumber, getRankColor } from '../utils/helpers';

const UserCard = ({ userStats }) => {
    const rankColor = getRankColor(userStats.rank);

    return (
        <div className="card">
            <div className="flex gap-3" style={{ alignItems: 'flex-start' }}>
                {userStats.avatarUrl && (
                    <img
                        src={userStats.avatarUrl}
                        alt={userStats.handle}
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                            border: `2px solid ${rankColor}`,
                        }}
                    />
                )}
                <div style={{ flex: 1 }}>
                    <h2 style={{ marginBottom: '0.5rem' }}>{userStats.handle}</h2>
                    <div className="flex gap-2 mb-2" style={{ flexWrap: 'wrap' }}>
                        <span
                            className="badge"
                            style={{
                                background: `${rankColor}20`,
                                color: rankColor,
                                border: `1px solid ${rankColor}40`,
                            }}
                        >
                            {userStats.rank || 'Unrated'}
                        </span>
                        {userStats.country && (
                            <span className="badge badge-primary">{userStats.country}</span>
                        )}
                    </div>
                    {userStats.organization && (
                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                            {userStats.organization}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-4 mt-4" style={{ gap: '1rem' }}>
                <div>
                    <p className="stat-label">Rating</p>
                    <p className="stat-value" style={{ fontSize: '1.5rem', color: rankColor }}>
                        {userStats.rating || 0}
                    </p>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>
                        Max: {userStats.maxRating || 0}
                    </p>
                </div>
                <div>
                    <p className="stat-label">Problems Solved</p>
                    <p className="stat-value" style={{ fontSize: '1.5rem' }}>
                        {formatNumber(userStats.problemsSolved)}
                    </p>
                </div>
                <div>
                    <p className="stat-label">Contribution</p>
                    <p className="stat-value" style={{ fontSize: '1.5rem' }}>
                        {userStats.contribution || 0}
                    </p>
                </div>
                <div>
                    <p className="stat-label">Friends</p>
                    <p className="stat-value" style={{ fontSize: '1.5rem' }}>
                        {formatNumber(userStats.friendOfCount)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
