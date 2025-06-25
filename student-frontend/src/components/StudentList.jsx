import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Spinner, Alert, Button } from 'react-bootstrap';
import StudentCard from './StudentCard';

const StudentList = ({ students, setStudents, onEdit, onViewDetails, onDelete, showToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [groupedStudents, setGroupedStudents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/api/students');
        setStudents(response.data);
        setFilteredStudents(response.data); // Initialize filtered students
        setError(null);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError(err.response?.data?.message || 'Failed to load students. Please try again later.');
        showToast('Error loading students', 'danger');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [setStudents, showToast]);

  // Filter students whenever search term changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredStudents(students);
      } else {
        const filtered = students.filter(student => {
          const searchLower = searchTerm.toLowerCase();
          return (
            student.name.toLowerCase().includes(searchLower) ||
            student.email.toLowerCase().includes(searchLower) ||
            (student.course && student.course.toLowerCase().includes(searchLower)) ||
            (student.phone && student.phone.toLowerCase().includes(searchLower))
          );
        });
        setFilteredStudents(filtered);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, students]);

  // Group filtered students by course
  useEffect(() => {
    const grouped = {};
    filteredStudents.forEach(student => {
      const course = student.course || 'Unassigned';
      if (!grouped[course]) {
        grouped[course] = [];
      }
      grouped[course].push(student);
    });
    setGroupedStudents(grouped);
  }, [filteredStudents]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="student-management-container">
      <Form.Group className="mb-4 position-relative">
        <Form.Control
          type="text"
          placeholder="Search students by name, email, course, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
        />
        {searchTerm && (
          <Button 
            variant="link" 
            className="position-absolute end-0 top-50 translate-middle-y"
            onClick={() => setSearchTerm('')}
            style={{ right: '10px' }}
            aria-label="Clear search"
          >
            ×
          </Button>
        )}
      </Form.Group>

      <div className="mb-4">
        {isLoading ? (
          <div className="d-flex align-items-center">
            <Spinner animation="border" size="sm" className="me-2" />
            <span>Loading students...</span>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <h5>Total Students: {students.length}</h5>
            {searchTerm && (
              <small className="text-muted">
                Showing {filteredStudents.length} matching students
              </small>
            )}
          </>
        )}
      </div>

      {!isLoading && !error && (
        <>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-4">
              {searchTerm ? (
                <p>No students found matching "{searchTerm}"</p>
              ) : (
                <p>No students available</p>
              )}
            </div>
          ) : (
            Object.entries(groupedStudents).map(([course, courseStudents]) => (
              <div key={course} className="course-section mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>{course}</h4>
                  <small className="text-muted">{currentDate}</small>
                </div>
                
                <div className="student-cards-container">
                  {courseStudents.map(student => (
                    <StudentCard 
                      key={student.id} 
                      student={student} 
                      onDelete={onDelete}
                      onEdit={onEdit}
                      onViewDetails={onViewDetails}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default StudentList;