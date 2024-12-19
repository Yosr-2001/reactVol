import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/style/signStyle.scss';

const Signin = () => {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usenavigate = useNavigate();

    const HandleLogin = async (e) => {
        e.preventDefault();

        if (validate()) {
            const inputObj = {
                userName: username,
                password: password,
            };

            try {
                const response = await fetch("http://localhost:5235/api/Compte/Login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(inputObj),
                });

                if (!response.ok) {
                    throw new Error('Invalid credentials');
                }

                const resp = await response.json();
                console.log(resp);

                sessionStorage.setItem('username', username);
                sessionStorage.setItem('jwttoken', resp.token);
                sessionStorage.setItem('role', resp.roles);
                sessionStorage.setItem('email', resp.email);
                console.log("role user connecté:", resp.roles);
                console.log("session storage contains :", sessionStorage)

                setSuccessMessage('Login successful! Redirecting...');
                if (resp.roles == "Admin")
                    setTimeout(() => usenavigate('/Dash'), 1500);
                else setTimeout(() => usenavigate('/home'), 1500);
            } catch (err) {
                setError(`Login Failed: ${err.message}`);
                setSuccessMessage('');
            }
        }
    };


    const validate = () => {
        return username.length > 0 && password.length > 0;
    };

    return (
        <div className="signin-container">
            <div className="sky-background">
                <div className="clouds"></div>
                <div className="airplane"></div>
            </div>
            <Container className="signin-card-container">
                <Card className="signin-card">
                    <div className="text-center">
                        <h2>Welcome Aboard</h2>
                        <p className="text-secondary">Sign in to take flight!</p>
                    </div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    <Form noValidate validated={validated} onSubmit={HandleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Password is required.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <Link to="/forgot-password" className="text-secondary small">
                            Forgot Password?
                        </Link>
                        <p className="mt-2">
                            Don't have an account?{' '}
                            <Link to="/sign-up" className="text-primary">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Signin;
