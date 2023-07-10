const Login = (props) => {
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
                <input type="hidden" name="original" value={window.location.href}/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="invalid-feedback">
                    Incorrect username or password.
                </div>
            </form>
        </div>
    );
};

export default Login;