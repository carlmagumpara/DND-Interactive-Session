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

  // onDrop -> parent div
  // onDragOver -> parent div

  // draggable -> child div
  // onDragStart -> child div
  // onDragEnd -> child div

  console.log(selected_item);

  return (
    <Container className="pt-5">
      <Row>
        <Col>
          <p>Undone</p>
          <ListGroup
            className="pt-5 pb-5"
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              const id = parseInt(e.dataTransfer.getData('Text')); // get dataTransfer data
              const _todos = [...todos]; // copy to make it mutable
              const index = _todos.findIndex(item => item.id === id); // find index by value
              _todos[index].status = 'Undone'; // set status
              setTodos(_todos); // update todos state
              setSelectedItem(null); // reset selected item
            }}
          >
            {todos.filter(item => item.status === 'Undone').map(item => (
              <ListGroup.Item
                key={item.id}
                draggable
                onDragStart={e => {
                  e.dataTransfer.setData('Text', item.id); // hold the value to another element, its like context API
                  setSelectedItem(item);
                }}
                onDragEnd={() => alert('end')}
                style={{ border: item.id === selected_item?.id ? '1px solid red' : 'none' }}
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
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              const id = parseInt(e.dataTransfer.getData('Text')); // get dataTransfer data
              const _todos = [...todos]; // copy to make it mutable
              const index = _todos.findIndex(item => item.id === id); // find index by value
              _todos[index].status = 'Done'; // set status
              setTodos(_todos); // update todos state
              setSelectedItem(null); // reset selected item
            }}
          >
            {todos.filter(item => item.status === 'Done').map(item => (
              <ListGroup.Item
                key={item.id}
                draggable
                onDragStart={e => {
                  e.dataTransfer.setData('Text', item.id); // hold the value to another element, its like context API
                  setSelectedItem(item);
                }}
                onDragEnd={() => setSelectedItem(null)}
                style={{ border: item.id === selected_item?.id ? '1px solid red' : 'none' }}
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