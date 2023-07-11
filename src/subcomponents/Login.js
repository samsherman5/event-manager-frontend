import { useState, useEffect } from "react";

const Login = (props) => {
    const link = window.location.href; // link to current page
    const [isIncorrect, setIsIncorrect] = useState(false); // If the backend responded that the psw is incorrect

    useEffect(() => {
        if (link.endsWith("?")) {
          setIsIncorrect(true);
        }
    }, [link]);

    return (
        <div className="d-flex flex-column text-center justify-content-center align-items-center" style={{ height: "100vh" }}>
            <form action={`${props.address}/login`} method="post" className="login-form">
                <div className="mb-3">
                    <label htmlFor="inputUsername" className="text-white form-label">Username</label>
                    <input type="text" className="form-control" id="inputUsername" name="username" aria-describedby="usernameHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="text-white form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" name="password"/>
                </div>
                <input type="hidden" name="original" value={link}/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className={`text-muted mt-2 weight-500 ${!isIncorrect ? 'd-none' : ''}`}>
                    Incorrect username or password.
                </p>
            </form>
        </div>
    );
};

export default Login;