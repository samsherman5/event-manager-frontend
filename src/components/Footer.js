const Footer = ({viewMode}) => (
    <footer className="mt-auto">
        <div className="bg-light mb-0 py-3 mt-1 border-top">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col">
                        {!viewMode ? (
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <a href="/json" className="small-tag text-muted mx-2 text-decoration-none">Import/Export JSON</a>
                                <a href="/pdf" className="small-tag text-muted mx-2 text-decoration-none">Download as PDF</a>
                                <a href="/image" className="small-tag text-muted mx-2 text-decoration-none">View Image</a>
                            </div>
                        ) : (
                            <div className="row justify-content-center">
                                <div className="col text-center h6 m-0 text-muted">Designed by Charley Wolf</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;