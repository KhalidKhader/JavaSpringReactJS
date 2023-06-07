import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, FormGroup } from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [save,setSave] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    major: "",
    phone: "",
    age: "",
  });

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/user", formData);
      setFormData({
        name: "",
        email: "",
        major: "",
        phone: "",
        age: "",
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectToUpdate = async (id) => {
    try {
      await axios.get(`http://localhost:8080/user/${id}`).then((res) =>{
        setFormData({
          name: res.data.name,
          email: res.data.email,
          major: res.data.major,
          phone: res.data.phone,
          age: res.data.age,
        });
        setSave(res.data.id);
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate=async (id) => {
    try {
      await axios.put(`http://localhost:8080/user/${id}`, formData);
      setFormData({
        name: "",
        email: "",
        major: "",
        phone: "",
        age: "",
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <h1>Employee Form</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormGroup>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="major">
          <Form.Label>Major</Form.Label>
          <Form.Control
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{margin:'10px'}}>
          Create Employee
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Major</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.major}</td>
              <td>{user.phone}</td>
              <td>{user.age}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user.id)}
                  style={{margin:'10px'}}
                >
                  Delete
                </Button>
                <Button
                  variant="warning"
                  onClick={() => handleSelectToUpdate(user.id)}
                  style={{margin:'10px'}}
                >
                  Select to Update
                </Button>
                {save === user.id &&(<Button
                  variant="success"
                  onClick={() => handleUpdate(user.id)}
                  style={{margin:'10px'}}
                >
                  Save
                </Button>)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
