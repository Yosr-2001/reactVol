import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const Forbidden = () => {
    return (<>
        <Navbar />
        <div style={styles.container}>
            <img src="https://wpexperts.io/wp-content/uploads/2024/07/wp-experts-new-blogs-3_What-Causes-the-403-Forbidden-Error-in-WordPress-.jpg" alt="Forbidden Access" style={styles.image} />
            <h1 style={styles.title}>403 - Forbidden</h1>
            <p style={styles.message}>
                Oops! You don't have permission to access this page.
            </p>
            <Link to="/" style={styles.link}>
                Go Back to Home
            </Link>
        </div></>
    );
};


const styles = {

    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        padding: '120px',
    },
    image: {
        maxWidth: '800px',
        width: '90%',
        marginBottom: '80px',
    },
    title: {
        fontSize: '2.5rem',
        color: '#343a40',
        marginBottom: '10px',
    },
    message: {
        fontSize: '1.2rem',
        color: '#6c757d',
        marginBottom: '20px',
    },
    link: {
        fontSize: '1rem',
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default Forbidden;
