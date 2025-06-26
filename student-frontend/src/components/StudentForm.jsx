import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

const StudentForm = ({ closeModal, mode = 'add', student }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mode === 'edit' && student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        course: student.course,
      });
    }
  }, [mode, student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await axios({
        method: mode === 'add' ? 'post' : 'put',
        url: `http://localhost:8081/api/students${mode === 'edit' ? `/${student.id}` : ''}`,
        data: formData,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      closeModal(response.data);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || `Error ${mode === 'add' ? 'adding' : 'updating'} student`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
      
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Course</Form.Label>
        <Form.Control
          type="text"
          name="course"
          placeholder="Enter course"
          value={formData.course}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button 
        type="submit" 
        className="w-100" 
        variant="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        ) : mode === 'add' ? (
          'Add Student'
        ) : (
          'Update Student'
        )}
      </Button>
    </Form>
  );
};

export default StudentForm;