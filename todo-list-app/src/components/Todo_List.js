import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './Todo_items';
import { Row, Col, Form, Button } from 'react-bootstrap';

const API_URL = 'http://localhost:5000/api/todos';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error('Error fetching todos:', err));
  }, []);

  const addOrUpdateTodo = () => {
    if (editTodo) {
      axios.put(`${API_URL}/${editTodo._id}`, { text: newTask })
        .then((res) => {
          setTodos(todos.map((todo) => (todo._id === editTodo._id ? res.data : todo)));
          setEditTodo(null);
          setNewTask('');
        })
        .catch((err) => console.error('Error updating todo:', err));
    } else {
      axios.post(API_URL, { text: newTask })
        .then((res) => {
          setTodos([...todos, res.data]);
          setNewTask('');
        })
        .catch((err) => console.error('Error adding todo:', err));
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error('Error deleting todo:', err));
  };

  return (
    <div>
      <Row className="mb-3">
        <Col xs={9}>
          <Form.Control
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </Col>
        <Col xs={3}>
          <Button onClick={addOrUpdateTodo} variant={editTodo ? "warning" : "primary"}>
            {editTodo ? 'Update' : 'Add'}
          </Button>
        </Col>
      </Row>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onEdit={(t) => { setEditTodo(t); setNewTask(t.text); }} onDelete={deleteTodo} />
      ))}
    </div>
  );
};

export default TodoList;
