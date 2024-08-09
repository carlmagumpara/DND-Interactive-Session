import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Container, Row, Col, ListGroup } from 'react-bootstrap';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      todo: 'Todo 1',
      status: 'Done'
    },
    {
      id: 2,
      todo: 'Todo 2',
      status: 'Undone'
    },
    {
      id: 3,
      todo: 'Todo 3',
      status: 'Done'
    },
    {
      id: 4,
      todo: 'Todo 4',
      status: 'Undone'
    },
    {
      id: 5,
      todo: 'Todo 5',
      status: 'Done'
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <p>Done Todos</p>
            <div
              className="p-5"
              onDrop={e => {
                const id = parseInt(e.dataTransfer.getData("Text"));
                const _todos = [...todos];
                const selected_todo_index = todos.findIndex(item => item.id === id);
                _todos[selected_todo_index].status = 'Done';
                setTodos(_todos);
              }}
              onDragOver={e => {
                event.stopPropagation();
                event.preventDefault();
              }}
            >
              <ListGroup>
                {todos.filter(item => item.status === 'Done').map(item => (
                  <ListGroup.Item
                    draggable
                    onDragStart={e => {
                      setSelectedItem(item);
                      e.dataTransfer.setData("Text", item.id);
                    }}
                    onDragEnd={() => setSelectedItem(null)}
                    style={{ opacity: selectedItem?.id === item.id ? 0.5 : 1 }}
                  >
                    {item.todo}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
          <Col>
            <p>Undone Todos</p>
            <div
              className="p-5"
              onDrop={e => {
                const id = parseInt(e.dataTransfer.getData("Text"));
                const _todos = [...todos];
                const selected_todo_index = todos.findIndex(item => item.id === id);
                _todos[selected_todo_index].status = 'Undone';
                setTodos(_todos);
              }}
              onDragOver={e => {
                event.stopPropagation();
                event.preventDefault();
              }}
            >
              <ListGroup>
                {todos.filter(item => item.status === 'Undone').map(item => (
                  <ListGroup.Item
                    draggable
                    onDragStart={e => {
                      setSelectedItem(item);
                      e.dataTransfer.setData("Text", item.id);
                    }}
                    onDragEnd={() => setSelectedItem(null)}
                    style={{ opacity: selectedItem?.id === item.id ? 0.5 : 1 }}
                  >
                    {item.todo}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
