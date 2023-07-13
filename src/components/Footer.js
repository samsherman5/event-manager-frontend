const Footer = () => (
    <footer className="bg-light mb-0 d-flex flex-wrap justify-content-center align-items-center py-3 mt-1 border-top">
        <div className="d-flex flex-row border-bottom">
            <a href="/json" className="small-tag text-muted  mx-2 text-decoration-none">Import/Export JSON</a>

            <a href="/pdf" className="small-tag text-muted mx-2 text-decoration-none">Download as PDF</a>

            <a href="/image" className="small-tag text-muted mx-2 text-decoration-none">View Image</a>
        </div>
        <p class="text-center text-muted">Designed by Charley Wolf</p>
    </footer>
);

export default Footer;