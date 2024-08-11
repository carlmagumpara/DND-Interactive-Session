import { useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      todo: 'Sample 1',
      status: 'Done',
    },
    {
      id: 2,
      todo: 'Sample 2',
      status: 'Done',
    },
    {
      id: 3,
      todo: 'Sample 3',
      status: 'Undone',
    },
    {
      id: 4,
      todo: 'Sample 4',
      status: 'Done',
    },
    {
      id: 5,
      todo: 'Sample 5',
      status: 'Undone',
    }
  ]);
  const [selected_item, setSelectedItem] = useState(null);
  const [drag_over, setDragOver] = useState(null);

  // Drop Zone
  // onDrop -> parent div
  // onDragOver -> parent div
  // onDragLeave -> parent div

  // Drag Item
  // draggable -> child div
  // onDragStart -> child div
  // onDragEnd -> child div

  return (
    <Container className="pt-5">
      <Row>
        <Col>
          <p>Undone</p>
          <ListGroup
            className="pt-5 pb-5"
            onDragOver={e => {
              setDragOver('Undone');
              e.preventDefault();
            }}
            onDragLeave={e => {
              setDragOver(null);
              e.preventDefault();
            }}
            onDrop={e => {
              const id = parseInt(e.dataTransfer.getData('Text')); // get dataTransfer data
              const _todos = [...todos]; // copy to make it mutable
              const index = _todos.findIndex(item => item.id === id); // find index by value
              _todos[index].status = 'Undone'; // set status
              setTodos(_todos); // update todos state
              setSelectedItem(null); // reset selected item
              setDragOver(null); // reset drag over
            }}
          >
            {drag_over === 'Undone' ? <p>Drop Here</p> : null}
            {todos.filter(item => item.status === 'Undone').map(item => (
              <ListGroup.Item
                key={item.id}
                draggable
                onDragStart={e => {
                  e.dataTransfer.setData('Text', item.id); // hold the value to another element, its like context API
                  setSelectedItem(item);
                }}
                onDragEnd={() => {
                  setSelectedItem(null);
                  setDragOver(null);
                }}
                style={{ border: item.id === selected_item?.id ? '1px solid red' : '1px solid transparent' }}
              >
                {item.todo}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <p>Done</p>
          <ListGroup
            className="pt-5 pb-5"
            onDragOver={e => {
              setDragOver('Done');
              e.preventDefault();
            }}
            onDragLeave={e => {
              setDragOver(null);
              e.preventDefault();
            }}
            onDrop={e => {
              const id = parseInt(e.dataTransfer.getData('Text')); // get dataTransfer data
              const _todos = [...todos]; // copy to make it mutable
              const index = _todos.findIndex(item => item.id === id); // find index by value
              _todos[index].status = 'Done'; // set status
              setTodos(_todos); // update todos state
              setSelectedItem(null); // reset selected item
              setDragOver(null); // reset drag over
            }}
          >
            {drag_over === 'Done' ? <p>Drop Here</p> : null}
            {todos.filter(item => item.status === 'Done').map(item => (
              <ListGroup.Item
                key={item.id}
                draggable
                onDragStart={e => {
                  e.dataTransfer.setData('Text', item.id); // hold the value to another element, its like context API
                  setSelectedItem(item);
                }}
                onDragEnd={() => {
                  setSelectedItem(null);
                  setDragOver(null);
                }}
                style={{ border: item.id === selected_item?.id ? '1px solid red' : '1px solid transparent' }}
              >
                {item.todo}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;