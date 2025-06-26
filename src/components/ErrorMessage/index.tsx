interface ErrorMessageProps {
    message?: string;
    className?: string;
}


const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
    if (!message) return null;

    return (
        <div className={`error-message text-danger mt-1 ${className}`} style={{ fontSize: '0.875rem' }}>
            {message}
        </div>
    );
};

export default ErrorMessage