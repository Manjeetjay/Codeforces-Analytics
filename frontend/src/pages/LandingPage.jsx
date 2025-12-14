import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BarChart2, Users, ArrowRight, ChevronDown } from 'lucide-react';

const LandingPage = () => {
    const [handle, setHandle] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (handle.trim()) {
            navigate(`/dashboard/${handle}`);
        }
    };

    const scrollToAnalytics = () => {
        document.getElementById('analytics-section').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

            {/* Hero Section */}
            <section style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <h1 style={{ fontSize: '6rem', fontWeight: '900', letterSpacing: '-0.05em', marginBottom: '1rem' }}>
                    CodeMetrics
                </h1>
                <p className="text-muted" style={{ fontSize: '1.5rem', maxWidth: '600px', marginBottom: '3rem' }}>
                    The ultimate platform for visualizing and analyzing your Codeforces journey. Clean. Simple. Professional.
                </p>
                <button
                    onClick={scrollToAnalytics}
                    className="btn btn-primary"
                    style={{ padding: '1rem 2rem', fontSize: '1.25rem', borderRadius: '50px' }}
                >
                    Get Started <ChevronDown size={24} style={{ marginLeft: '0.5rem' }} />
                </button>
            </section>

            {/* Analytics Section */}
            <section id="analytics-section" style={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4rem 2rem',
                background: '#ffffff',
                color: 'var(--bg-primary)'
            }}>
                <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', maxWidth: '1200px' }}>

                    <div style={{ flex: '1 1 400px', textAlign: 'left' }}>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1', color: 'var(--bg-primary)' }}>Deep Analytics</h2>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.6', color: '#4b5563' }}>
                            Stop guessing. Start knowing. <br />
                            Enter your Codeforces handle to unlock a treasure trove of performance metrics, problem stats, and rating history.
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--bg-primary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BarChart2 size={20} /> Problem Distributions</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={20} /> Rating Graphs</div>
                        </div>
                    </div>

                    <div style={{ flex: '1 1 400px' }}>
                        <form onSubmit={handleSearch} className="card" style={{ padding: '2.5rem', display: 'flex', gap: '1.5rem', flexDirection: 'column', boxShadow: 'var(--shadow-xl)' }}>
                            <h3 className="text-center" style={{ marginBottom: '0.5rem' }}>Analyze Profile</h3>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Enter Codeforces Handle"
                                    value={handle}
                                    onChange={(e) => setHandle(e.target.value)}
                                    style={{ fontSize: '1.25rem', padding: '1rem' }}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', fontSize: '1.25rem', padding: '1rem' }}>
                                <Search size={24} style={{ marginRight: '0.5rem' }} /> Analyze Now
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            {/* Comparison Section */}
            <section style={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4rem 2rem'
            }}>
                <div className="container" style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', justifyContent: 'space-between', gap: '4rem', maxWidth: '1200px' }}>

                    <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
                        <div className="card" style={{ padding: '3rem', borderStyle: 'dashed', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
                            <Users size={80} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>You vs. Rival</div>
                        </div>
                    </div>

                    <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>Head-to-Head Comparison</h2>
                        <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '3rem', lineHeight: '1.6' }}>
                            Rivalries fuel growth. <br />
                            Compare stats side-by-side to find your edge. Visualize the gap and close it.
                        </p>

                        <button
                            onClick={() => navigate('/compare')}
                            className="btn btn-secondary"
                            style={{
                                padding: '1.5rem 3rem',
                                fontSize: '1.5rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                border: '2px solid var(--text-primary)'
                            }}
                        >
                            Start Comparison <ArrowRight size={28} style={{ marginLeft: '1rem' }} />
                        </button>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                <p>&copy; 2025 CodeMetrics. Built for Competitive Programmers.</p>
            </footer>

        </div>
    );
};

export default LandingPage;
