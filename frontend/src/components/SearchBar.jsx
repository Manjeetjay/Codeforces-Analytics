import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [handle, setHandle] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handle.trim()) {
            navigate(`/dashboard/${handle.trim()}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
            <div className="input-group">
                <input
                    type="text"
                    className="input"
                    placeholder="Enter Codeforces handle (e.g., tourist)"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    style={{ fontSize: '1.125rem', padding: '1rem 1.25rem' }}
                />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Analyze Performance
            </button>
        </form>
    );
};

export default SearchBar;
