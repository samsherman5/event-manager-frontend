import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = ({address}) => {
    const navigate = useNavigate();
    const username = useRef(null);
    const password = useRef(null);
    const [isIncorrect, setIsIncorrect] = useState(false); // If the backend responded that the psw is incorrect
    document.body.style.backgroundColor = '#f0f0f0';

    function handleSubmit(event) {
        event.preventDefault();
        
        fetch(`${address}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            withCredentials: true
        }).then(res => {
            if (res.status && res.status === 401) {
                setIsIncorrect(true);
                event.target.reset();
            } else if (res.status && res.status === 200) {
                navigate('/');
            }
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div className="d-flex flex-column text-center justify-content-center align-items-center" style={{ height: "100vh" }}>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="mb-3">
                    <label htmlFor="inputUsername" className="text-black large-label form-label">Username</label>
                    <input ref={username} type="text" className="form-control" id="inputUsername" name="username" aria-describedby="usernameHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="text-black large-label form-label">Password</label>
                    <input ref={password} type="password" className="form-control" id="inputPassword" name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className={`invalid-feedback mt-2 weight-500 ${isIncorrect ? 'd-block' : ''}`}>
                    Incorrect username or password.
                </p>
            </form>
        </div>
    );
};

export default Login;