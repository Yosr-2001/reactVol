import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { FaPlane } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../assets/style/avion.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { apiRequest } from "../../utils/api";

function AvionForm() {
  const navigate = useNavigate();


  useEffect(() => {
    const token = sessionStorage.getItem('jwttoken');
    if (!token) {
      navigate('/sign-in'); //ken token not found wla expiré
    }
  }, [navigate]);


  const [formData, setFormData] = useState({
    typeAvion: "",
    capaciteAvion: "",
    fabriquantAvion: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.typeAvion) newErrors.typeAvion = "Type of airplane is required.";
    if (!formData.capaciteAvion || isNaN(formData.capaciteAvion))
      newErrors.capaciteAvion = "Capacity must be a valid number.";
    if (!formData.fabriquantAvion) newErrors.fabriquantAvion = "Manufacturer is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newAvion = {
      typeAvion: formData.typeAvion,
      capaciteAvion: parseInt(formData.capaciteAvion, 10),
      fabriquantAvion: formData.fabriquantAvion,
    };

    try {
      const response = await apiRequest('http://localhost:5235/api/Avion', 'POST', newAvion);
      console.log('Avion added successfully:', response);
      setFormData({ typeAvion: '', capaciteAvion: '', fabriquantAvion: '' });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ server: error.message });
    }
  };


  return (
    <div className="avion-form-container" data-aos="fade-up">
      <div className="form-header">
        <FaPlane size={30} color="#003366" />
        <h2>Create a New Airplane</h2>
      </div>
      <Form onSubmit={handleSubmit} className="avion-form">
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="typeAvion">
              <Form.Label>Type of Airplane</Form.Label>
              <Form.Control
                type="text"
                name="typeAvion"
                placeholder="Enter airplane type"
                value={formData.typeAvion}
                onChange={handleInputChange}
                isInvalid={!!errors.typeAvion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.typeAvion}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="capaciteAvion">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capaciteAvion"
                placeholder="Enter capacity"
                value={formData.capaciteAvion}
                onChange={handleInputChange}
                isInvalid={!!errors.capaciteAvion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.capaciteAvion}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="fabriquantAvion">
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control
                type="text"
                name="fabriquantAvion"
                placeholder="Enter manufacturer name"
                value={formData.fabriquantAvion}
                onChange={handleInputChange}
                isInvalid={!!errors.fabriquantAvion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fabriquantAvion}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="submit-btn">
          Create Airplane
        </Button>
      </Form>
    </div>
  );
}

export default AvionForm;
