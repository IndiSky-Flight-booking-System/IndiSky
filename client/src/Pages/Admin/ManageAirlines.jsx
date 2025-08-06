import React, { useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import AdminSidebar from "../../Component/Admin/AdminSidebar";
import '../../css/ManageAirlines.css'; // Optional CSS file if you want custom styling
import "../../css/AdminHeader.css";

export default function ManageAirlines() {
  const [airlines, setAirlines] = useState([
    { airline_id: 1, airline_name: 'IndiGo', country: 'India' },
    { airline_id: 2, airline_name: 'Emirates', country: 'UAE' },
  ]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ airline_name: '', country: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleClose = () => {
    setShowModal(false);
    setFormData({ airline_name: '', country: '' });
    setEditIndex(null);
  };

  const handleShow = () => setShowModal(true);

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...airlines];
      updated[editIndex] = { ...updated[editIndex], ...formData };
      setAirlines(updated);
    } else {
      setAirlines([...airlines, { airline_id: airlines.length + 1, ...formData }]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setFormData({
      airline_name: airlines[index].airline_name,
      country: airlines[index].country,
    });
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = [...airlines];
    updated.splice(index, 1);
    setAirlines(updated);
  };

  return (
    <div className={`admin-layout d-flex ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <div className="admin-main flex-grow-1">
       <h1 className="indisky-admin-heading">IndiSky Admin</h1>

        <div className="main-content container-fluid mt-5 pt-3 px-4">
        
          <h2 className="fw-bold mb-4">Manage Airlines</h2>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button onClick={handleShow}>Add Airline</Button>
          </div>

          <div className="table-responsive shadow-sm rounded">
            <Table striped bordered hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {airlines.map((airline, idx) => (
                  <tr key={idx}>
                    <td>{airline.airline_id}</td>
                    <td>{airline.airline_name}</td>
                    <td>{airline.country}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(idx)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(idx)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Modal */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{editIndex !== null ? 'Edit Airline' : 'Add Airline'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.airline_name}
                    onChange={(e) => setFormData({ ...formData, airline_name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
