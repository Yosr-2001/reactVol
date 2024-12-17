import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import '../assets/style/about.scss';
import Navbar from '../components/Navbar/Navbar';

const About = () => {
    return (
        <>
            <Navbar />
            <div className="about-flight-manager">


                <section className="mission-section">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        🌍 Notre Mission
                    </motion.h2>
                    <motion.p
                        className="section-description"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Chez <strong>Flight Manager</strong>, nous ne sommes pas seulement
                        une compagnie aérienne. Nous sommes des rêveurs, connectant les
                        destinations et rapprochant les cœurs. Avec une technologie de pointe
                        et une expérience client exceptionnelle, nous redéfinissons ce que
                        signifie voyager.
                    </motion.p>
                </section>

                <section className="why-us-section">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Pourquoi Choisir Flight Manager ?
                    </motion.h2>
                    <div className="features">
                        <motion.div
                            className="feature-box"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3>Technologie Avancée</h3>
                            <p>
                                Des avions modernes et une gestion de vol intelligente pour des
                                trajets sûrs et efficaces.
                            </p>
                        </motion.div>
                        <motion.div
                            className="feature-box"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3>Service Premium</h3>
                            <p>
                                Un équipage dédié et un confort inégalé à chaque étape de votre
                                voyage.
                            </p>
                        </motion.div>
                        <motion.div
                            className="feature-box"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3>Durabilité</h3>
                            <p>
                                Une vision écoresponsable avec des initiatives pour réduire
                                l'empreinte carbone.
                            </p>
                        </motion.div>
                    </div>
                </section>


            </div>
        </>
    );
};


export default About;