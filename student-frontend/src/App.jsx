import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';
import { Container, Navbar, Nav, Button, Modal, Toast, ToastContainer } from 'react-bootstrap';
import './theme.css';

const App = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleOpenAdd = () => setShowAddModal(true);
  const handleCloseAdd = () => setShowAddModal(false);

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setSelectedStudent(null);
    setShowEditModal(false);
  };

  const handleOpenDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
    setShowDetailsModal(false);
  };

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [...prev, newStudent]);
    showNotification('Student added successfully!');
  };

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(prev => prev.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    showNotification('Student updated successfully!');
  };

  const handleDeleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
    showNotification('Student deleted successfully!');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Student Management System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={handleOpenAdd}>Add Student</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h2 className="mb-4">Student Management</h2>
        <StudentList 
          students={students}
          setStudents={setStudents}
          onEdit={handleOpenEdit} 
          onViewDetails={handleOpenDetails}
          onDelete={handleDeleteStudent}
        />
      </Container>

      {/* Add Student Modal */}
      <Modal show={showAddModal} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentForm 
            closeModal={(newStudent) => {
              handleCloseAdd();
              if (newStudent) handleAddStudent(newStudent);
            }} 
            mode="add" 
          />
        </Modal.Body>
      </Modal>

      {/* Edit Student Modal */}
      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentForm 
            closeModal={(updatedStudent) => {
              handleCloseEdit();
              if (updatedStudent) handleUpdateStudent(updatedStudent);
            }} 
            mode="edit" 
            student={selectedStudent} 
          />
        </Modal.Body>
      </Modal>

      {/* View Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentDetails student={selectedStudent} />
        </Modal.Body>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default App;