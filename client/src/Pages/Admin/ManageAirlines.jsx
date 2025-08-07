import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal, Pagination } from 'react-bootstrap';
import AdminSidebar from "../../Component/Admin/AdminSidebar";
import '../../css/ManageAirlines.css';
import "../../css/AdminHeader.css";
import { getAirlines, addAirline, editAirline, deleteAirline } from '../../Service/airline'; 
import { toast } from 'react-toastify';

export default function ManageAirlines() {
  const [airlines, setAirlines] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ airlineName: '', country: '' });
  const [editIndex, setEditIndex] = useState(null);

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAirlines();
  }, []);

  const fetchAirlines = async () => {
    try {
      const response = await getAirlines();
      setAirlines(response);
    } catch (error) {
      console.error("Failed to fetch airlines:", error);
      toast.error("Failed to load airlines.");
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ airlineName: '', country: '' });
    setEditIndex(null);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.airlineName || !formData.country) {
        toast.warning("Please fill in all fields.");
        return;
      }

      if (editIndex !== null) {
        
        const airlineId = airlines[editIndex].airlineId;

        const updatedAirline = await editAirline({
          airlineName: formData.airlineName,
          country: formData.country,
          airlineId
        });

        const updatedAirlines = [...airlines];
        updatedAirlines[editIndex] = updatedAirline;
        setAirlines(updatedAirlines);
        toast.success('Airline updated successfully!');
      } else {
      
        const newAirline = await addAirline({
          airlineName: formData.airlineName,
          country: formData.country
        });

        setAirlines([...airlines, newAirline]);
        toast.success('Airline added successfully!');
      }

      handleClose();
    } catch (error) {
      console.error('Failed to save airline:', error);
      toast.error('Failed to save airline. Please try again.');
    }
  };

  const handleEdit = (index) => {
    const realIndex = (currentPage - 1) * itemsPerPage + index;
    if (!airlines[realIndex]) return;

    const selectedAirline = airlines[realIndex];

    setFormData({
      airlineName: selectedAirline.airlineName,
      country: selectedAirline.country
    });

    setEditIndex(realIndex);
    setShowModal(true);
  };

const handleDelete = async (index) => {
  const realIndex = (currentPage - 1) * itemsPerPage + index;
  const airline = airlines[realIndex];

  if (!airline) return;

  if (!window.confirm(`Are you sure you want to delete ${airline.airlineName}?`)) return;

  try {
    await deleteAirline(airline.airlineId);

    toast.success('Airline removed successfully!');

    
    await fetchAirlines();

    
    if ((currentPage - 1) * itemsPerPage >= airlines.length - 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  } catch (error) {
    console.error('Failed to remove airline:', error);
    toast.error('Failed to remove airline. Please try again.');
  }
};



  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAirlines = airlines.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(airlines.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                  <th>Sr. No</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAirlines.length > 0 ? (
                  currentAirlines.map((airline, idx) => (
                    <tr key={airline.airlineId}>
                      <td>{indexOfFirstItem + idx + 1}</td>
                      <td>{airline.airlineName}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No Airlines Available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-3">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

              {[...Array(totalPages)].map((_, idx) => (
                <Pagination.Item
                  key={idx}
                  active={currentPage === idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
          )}

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
                    value={formData.airlineName}
                    onChange={(e) => setFormData({ ...formData, airlineName: e.target.value })}
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