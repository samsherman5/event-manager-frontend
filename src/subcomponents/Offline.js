const OfflineMode = () => {
    function retry() {
        window.location.reload(false);
    }

    return (
        <div className="d-flex flex-column text-center justify-content-center align-items-center" style={{ height: "100vh" }}>
            <h1 className="text-warning">Network Connection Error</h1>
            <p className="text-white">Please check your internet connection and try again.</p>
            <button className="btn btn-warning" onClick={retry}>Retry</button>
        </div>
    );
};

export default OfflineMode;