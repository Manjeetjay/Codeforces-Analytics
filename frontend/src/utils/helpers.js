export const formatNumber = (num) => {
    if (!num) return '0';
    return num.toLocaleString();
};

export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const getRankColor = (rank) => {
    const rankColors = {
        'newbie': '#808080',
        'pupil': '#008000',
        'specialist': '#03a89e',
        'expert': '#0000ff',
        'candidate master': '#aa00aa',
        'master': '#ff8c00',
        'international master': '#ff8c00',
        'grandmaster': '#ff0000',
        'international grandmaster': '#ff0000',
        'legendary grandmaster': '#ff0000',
    };

    return rankColors[rank?.toLowerCase()] || '#808080';
};

export const getRatingColor = (rating) => {
    if (rating >= 2400) return '#ff0000';
    if (rating >= 2100) return '#ff8c00';
    if (rating >= 1900) return '#aa00aa';
    if (rating >= 1600) return '#0000ff';
    if (rating >= 1400) return '#03a89e';
    if (rating >= 1200) return '#008000';
    return '#808080';
};

export const getVerdictColor = (verdict) => {
    if (verdict === 'OK') return 'var(--success-green)';
    if (verdict.includes('WRONG')) return 'var(--danger-red)';
    if (verdict.includes('TIME')) return 'var(--warning-orange)';
    return 'var(--text-muted)';
};

export const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};
