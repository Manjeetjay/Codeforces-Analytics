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
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>

            {/* Background Effects */}
            <div className="bg-grid-pattern" style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.3 }} />
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60vh',
                height: '60vh',
                minWidth: '600px',
                minHeight: '600px',
                background: 'var(--accent-glow)',
                borderRadius: '50%',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            {/* Hero Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div className="animate-fade-in-up" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="badge badge-primary mb-3" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(4, 78, 17, 0.31)', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></span>
                        Version 2.0 Now Live
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                        fontWeight: '900',
                        letterSpacing: '-0.05em',
                        marginBottom: '1.5rem',
                        lineHeight: 1.1
                    }}>
                        Master Your <br />
                        <span className="text-gradient">Competitive Journey</span>
                    </h1>
                    <p className="text-muted" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', maxWidth: '600px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                        Advanced analytics and head-to-head comparisons for Codeforces.
                        Beautifully visualized.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={scrollToAnalytics}
                            className="btn btn-primary"
                            style={{
                                padding: '1rem 2.5rem',
                                fontSize: '1.125rem',
                                borderRadius: '10px',
                                boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            Analyze Profile <Search size={20} style={{ marginLeft: '0.5rem' }} />
                        </button>
                    </div>
                </div>

                <div
                    className="animate-float"
                    style={{ position: 'absolute', bottom: '3rem', opacity: 0.5, cursor: 'pointer' }}
                    onClick={scrollToAnalytics}
                >
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* Analytics Section */}
            <section id="analytics-section" style={{
                position: 'relative',
                zIndex: 1,
                padding: '6rem 2rem',
                background: 'linear-gradient(to bottom, transparent, var(--bg-secondary) 10%)'
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="glass-panel" style={{ padding: '3rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>

                        <div style={{ flex: '1 1 400px' }}>
                            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                                Deep <span className="text-gradient">Analytics</span>
                            </h2>
                            <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                                Visualize your progress like never before. Track rating changes, solve distributions, and identify weak spots instantly.
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="card" style={{ background: 'rgba(255,255,255,0.03)', border: 'none' }}>
                                    <BarChart2 className="mb-2" style={{ color: 'rgba(0, 10, 104, 1)' }} />
                                    <div className="text-muted text-sm">Problem Stats</div>
                                </div>
                                <div className="card" style={{ background: 'rgba(255,255,255,0.03)', border: 'none' }}>
                                    <Users className="mb-2" style={{ color: 'rgba(0, 85, 14, 1)' }} />
                                    <div className="text-muted text-sm">Peer Ranking</div>
                                </div>
                            </div>
                        </div>

                        <div style={{ flex: '1 1 400px' }}>
                            <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Enter Codeforces Handle"
                                        value={handle}
                                        onChange={(e) => setHandle(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '1.5rem',
                                            paddingLeft: '3.5rem',
                                            fontSize: '1.25rem',
                                            background: 'rgba(0,0,0,0.3)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px'
                                        }}
                                    />
                                    <Search size={24} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '1.25rem', fontSize: '1.125rem', borderRadius: '12px' }}>
                                    Generate Report
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section style={{
                padding: '6rem 2rem',
                position: 'relative',
                zIndex: 1,
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Head-to-Head</h2>
                        <p className="text-muted" style={{ fontSize: '1.25rem' }}>Find your edge. Compare with rivals.</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '2rem',
                        alignItems: 'start'
                    }}>
                        {/* Stats Cards */}
                        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'left' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                <div>
                                    <div className="text-muted text-sm mb-1">YOU</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1650</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-muted text-sm mb-1">RIVAL</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1720</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <div className="text-muted text-sm mb-2 flex justify-between">
                                        <span>Problems Solved</span>
                                        <span className="text-success">+12</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
                                        <div style={{ flex: 1, background: '#fff', borderRadius: '4px' }}></div>
                                        <div style={{ flex: 0.8, background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-muted text-sm mb-2 flex justify-between">
                                        <span>Max Streak</span>
                                        <span className="text-danger">-3</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
                                        <div style={{ flex: 0.6, background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}></div>
                                        <div style={{ flex: 1, background: '#fff', borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Graph Section */}
                        <div className="glass-panel" style={{ padding: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div className="text-muted text-sm mb-4 text-left">RATING TRAJECTORY</div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'end', position: 'relative' }}>
                                {/* Simulated Graph Lines */}
                                <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                                    {/* Grid Lines */}
                                    <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                                    <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                                    <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

                                    {/* You Line (Green/White) */}
                                    <path
                                        d="M0,45 Q20,40 40,30 T80,15 T100,5"
                                        fill="none"
                                        stroke="#fff"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}
                                    />
                                    {/* Rival Line (Gray) */}
                                    <path
                                        d="M0,40 Q25,35 50,35 T100,20"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.3)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeDasharray="4 4"
                                    />

                                    {/* Intersect Point */}
                                    <circle cx="25" cy="38" r="2" fill="#fff" />
                                </svg>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '4rem' }}>
                        <button
                            onClick={() => navigate('/compare')}
                            className="btn btn-secondary"
                            style={{
                                padding: '1rem 3rem',
                                fontSize: '1.25rem',
                                borderRadius: '50px',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}
                        >
                            Start Comparison <ArrowRight size={20} style={{ marginLeft: '1rem' }} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '2rem',
                textAlign: 'center',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                color: 'var(--text-muted)'
            }}>
                <p>&copy; 2025 CodeMetrics. Built for Competitive Programmers.</p>
            </footer>

        </div>
    );
};

export default LandingPage;
