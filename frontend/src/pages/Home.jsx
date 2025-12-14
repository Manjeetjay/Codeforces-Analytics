import React from 'react';
import SearchBar from '../components/SearchBar';

const Home = () => {
    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        CodeMetrics
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                        Competitive Programming Analytics Platform
                    </p>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                        Analyze your Codeforces performance with intuitive visualizations and comprehensive statistics
                    </p>
                </div>

                <SearchBar />

                <div className="grid grid-cols-3 mt-4" style={{ gap: '1.5rem', marginTop: '3rem' }}>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Real-Time Stats</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            Get instant insights into your rating, problems solved, and rankings
                        </p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Visual Analytics</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            Interactive charts showing rating trends and problem breakdowns
                        </p>
                    </div>
                    <div className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Track Progress</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                            Monitor your competitive programming journey and identify strengths
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Try with popular handles:
                    </p>
                    <div className="flex gap-2" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/dashboard/tourist" className="badge badge-primary" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                            tourist
                        </a>
                        <a href="/dashboard/Petr" className="badge badge-primary" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                            Petr
                        </a>
                        <a href="/dashboard/Benq" className="badge badge-primary" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                            Benq
                        </a>
                        <a href="/dashboard/jiangly" className="badge badge-primary" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                            jiangly
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
