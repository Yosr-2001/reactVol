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
    const [role, setRole] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const usenavigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Validations (ensure that form data is valid)
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        // Check for validation
        if (validate()) {
            let inputobj = {
                "userName": username,
                "email": email,
                "password": password,
                "role": role || 'Utilisateur'
            };

            // Make API call to register
            fetch("http://localhost:5235/api/Compte/Register", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();  // Try to parse the JSON response
                })
                .then((resp) => {
                    console.log(resp);
                    // If response is JSON
                    if (resp.message) {
                        setSuccessMessage(resp.message); // Assuming the response has a message field
                        setError('');
                        // Redirect or handle success
                    } else {
                        setError('Unexpected response format');
                    }
                })
                .catch((err) => {
                    // If JSON parsing fails or network issues
                    console.error('Error:', err);
                    setError(`Registration failed due to: ${err.message}`);
                    setSuccessMessage('');
                });

        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setError('Please fill in all required fields and make sure the passwords match.');
            setSuccessMessage('');
        } else {
            // Handle the registration logic here
            setError('');
            setSuccessMessage('');
        }
        setValidated(true);
    };

    // Validation function to check if all fields are filled and passwords match
    const validate = () => {
        return username.length > 0 && email.length > 0 && password.length > 0 && confirmPassword === password;
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
                    {error && <Alert variant="danger">{error}</Alert>} {/* Error alert */}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Success alert */}
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
