import FormatJSON from "../components/subcomponents/FormatJSON";
import { useEffect } from "react";

const JSON = ({address}) => {
    useEffect(() => {
        document.body.style.backgroundColor = '#1F3B7C';
        document.body.style.backgroundImage = "";
    })

    return (
        <div className="container mt-3">
            <div className="row mt-auto">
                <div className="col-md-12">
                    <h1 className="text-center text-white">Export JSON</h1>
                    <pre className="bg-light text-black p-3 rounded">
                        <FormatJSON address={address}/>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default JSON;