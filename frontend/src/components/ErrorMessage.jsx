import React from 'react';

const ErrorMessage = ({ title = 'Error', message, onRetry }) => {
    return (
        <div className="error-container">
            <h3 className="error-title">{title}</h3>
            <p className="error-message">{message}</p>
            {onRetry && (
                <button className="btn btn-primary mt-3" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
