import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

const StudentCard = ({ student, onDelete, onEdit, onViewDetails }) => {
  const formattedDate = new Date(student.createdAt || new Date()).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      onDelete(student.id);
    }
  };

  return (
    <Card className="mb-3 student-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Title>{student.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{student.email}</Card.Subtitle>
          </div>
          <small className="text-muted">{formattedDate}</small>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={() => onViewDetails(student)}
          >
            View Details
          </Button>
          <ButtonGroup size="sm">
            <Button 
              variant="outline-secondary"
              onClick={() => onEdit(student)}
            >
              Edit
            </Button>
            <Button 
              variant="outline-danger" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ButtonGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;