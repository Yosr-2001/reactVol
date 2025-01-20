import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { FaPlane } from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../assets/style/avion.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function AvionForm() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState('planes');

  useEffect(() => {
    Aos.init();
  }, []);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    typeAvion: "",
    capaciteAvion: "",
    fabriquantAvion: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.typeAvion) {
      newErrors.typeAvion = "Type of airplane is required.";
    }
    if (!formData.capaciteAvion || isNaN(formData.capaciteAvion)) {
      newErrors.capaciteAvion = "Capacity must be a valid number.";
    }
    if (!formData.fabriquantAvion) {
      newErrors.fabriquantAvion = "Manufacturer is required.";
    }
    return newErrors;
  };

  const API_BASE_URL = "http://127.0.0.1:8000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newAvion = {
      TypeAvion: formData.typeAvion,
      CapaciteAvion: parseInt(formData.capaciteAvion, 10),
      FabriquantAvion: formData.fabriquantAvion,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/avions`, newAvion);
      if (response.status === 201) {
        console.log("Avion added successfully:", response.data);
        setFormData({ typeAvion: "", capaciteAvion: "", fabriquantAvion: "" });
        setErrors({});
        alert("Avion created successfully!");
        navigate("/Dashboard/#planes");
      } else {
        throw new Error(`Failed to create Avion. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
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
        {errors.server && (
          <p className="text-danger mt-3">Error: {errors.server}</p>
        )}
      </Form>
    </div>
  );
}

export default AvionForm;
