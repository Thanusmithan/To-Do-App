import React from 'react';
import { Dropdown, Card } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

function TodoItem({ todo, onEdit, onDelete }) {
  return (
    <Card className="shadow-sm mb-2">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <span>{todo.text}</span>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Options
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => onEdit(todo)}>
              <FaEdit /> Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onDelete(todo._id)}>
              <FaTrash /> Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
}

export default TodoItem;
