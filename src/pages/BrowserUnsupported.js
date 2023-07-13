/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";

const Error404 = ({browser}) =>  {
    useEffect(() => {
        document.body.style.backgroundColor = '#f0f0f0';
        document.body.style.backgroundImage = "";
    })

    return (
        <div className="d-flex flex-column text-center justify-content-center align-items-center" style={{ height: "100vh" }}>
            <h1 className="display-5">Browser Unsupported</h1>
            <h6 className="mb-2 text-black">Your browser is not supported by this site. Please try using a different browser.</h6>
            <small className="mb-3 text-black">{browser.os} {browser.name} {browser.version}</small>
        </div>
    );
};

export default Error404;