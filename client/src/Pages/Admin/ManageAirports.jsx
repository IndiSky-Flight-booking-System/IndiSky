
import React, { useState } from 'react';
import AdminSidebar from "../../Component/Admin/AdminSidebar";
import { Button, Modal, Table, Form } from 'react-bootstrap';

export default function ManageAirports() {
  const [airports, setAirports] = useState([
    { id: 1, name: 'Indira Gandhi Intl', city: 'Delhi', country: 'India', iata: 'DEL' },
    { id: 2, name: 'Chhatrapati Shivaji Intl', city: 'Mumbai', country: 'India', iata: 'BOM' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editAirport, setEditAirport] = useState(null);
  const [form, setForm] = useState({ name: '', city: '', country: '', iata: '' });

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setEditAirport(null);
    setForm({ name: '', city: '', country: '', iata: '' });
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (editAirport) {
      setAirports(airports.map(a => a.id === editAirport.id ? { ...editAirport, ...form } : a));
    } else {
      setAirports([...airports, { id: Date.now(), ...form }]);
    }
    handleClose();
  };

  const handleEdit = airport => {
    setEditAirport(airport);
    setForm({ name: airport.name, city: airport.city, country: airport.country, iata: airport.iata });
    setShowModal(true);
  };

  const handleDelete = id => setAirports(airports.filter(a => a.id !== id));

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="container p-4">
        <h2 className="mb-4">Manage Airports</h2>
        <Button className="mb-3" onClick={handleShow}>Add Airport</Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>City</th><th>Country</th><th>IATA</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {airports.map((a, idx) => (
              <tr key={a.id}>
                <td>{idx + 1}</td><td>{a.name}</td><td>{a.city}</td><td>{a.country}</td><td>{a.iata}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(a)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(a.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editAirport ? 'Edit Airport' : 'Add Airport'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Country</Form.Label>
                <Form.Control value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>IATA Code</Form.Label>
                <Form.Control value={form.iata} onChange={e => setForm({ ...form, iata: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" onClick={handleSubmit}>{editAirport ? 'Update' : 'Add'}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
