import "./Error.css";

function Error({ message = "Something went wrong. Please try again.", onRetry }) {
  return (
    <div className="error-container">
      <div className="error-card">

        {/* Icon */}
        <div className="error-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2 className="error-title">Failed to load</h2>
        <p className="error-message">{message}</p>

        {onRetry && (
          <button className="error-retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}

      </div>
    </div>
  );
}

export default Error;