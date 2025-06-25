import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';

const StudentDetails = ({ student }) => {
  if (!student) return <div>No student selected</div>;

  const formattedDate = new Date(student.createdAt || new Date()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div>
      <h4 className="mb-4">{student.name}</h4>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Email:</strong> {student.email}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Phone:</strong> {student.phone}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Course:</strong> <Badge bg="info">{student.course}</Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Enrollment Date:</strong> {formattedDate}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Student ID:</strong> {student.id}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default StudentDetails;