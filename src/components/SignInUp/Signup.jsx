import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/style/signStyle.scss';

const Signup = () => {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Utilisateur');
    const [confirmPassword, setConfirmPassword] = useState('');

    const usenavigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validate()) {
            setError('Please ensure all fields are correct.');
            return;
        }

        let inputobj = {
            userName: username,
            email: email,
            password: password,
            role: role || 'Utilisateur',
        };

        fetch('http://localhost:5235/api/Compte/Register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputobj),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((resp) => {
                console.log(resp);
                if (resp && resp.message) {
                    setSuccessMessage(resp.message);
                    setError('');
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('jwttoken', resp.token);
                    sessionStorage.setItem('role', "utilisateur");
                    sessionStorage.setItem('email', resp.email);
                    console.log("role user connecté:", resp.roles);
                    console.log("session storage contains :", sessionStorage)

                    setTimeout(() => usenavigate('/'), 2000);
                } else {
                    setError('Unexpected response format');
                }
            })
            .catch((err) => {
                console.error('Error:', err);
                setError(`Registration failed due to: ${err.message}`);
                setSuccessMessage('');
            });
    };

    const validate = () => {
        return (
            username.length > 0 &&
            email.length > 0 &&
            password.length > 0 &&
            confirmPassword === password
        );
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
                        <h2>Join the Flight</h2>
                        <p className="text-secondary">Create your account</p>
                    </div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    <Form noValidate validated={validated} onSubmit={handleRegister}>
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
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
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
                        <Form.Group controlId="formConfirmPassword" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Password confirmation is required.
                            </Form.Control.Feedback>
                            {password !== confirmPassword && confirmPassword.length > 0 && (
                                <div className="text-danger">Passwords do not match!</div>
                            )}
                        </Form.Group>
                        <Button type="submit" className="w-100" disabled={password !== confirmPassword}>
                            Register
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <p className="mt-2">
                            Already have an account?{' '}
                            <Link to="/sign-in" className="text-primary">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default Signup;
