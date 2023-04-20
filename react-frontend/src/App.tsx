import { useEffect, useState } from "react";
// import {
//   Badge,
//   Button,
//   Card,
//   Navbar,
//   Nav,
//   Table,
//   Container,
//   Row,
//   Col,
//   Form,
//   OverlayTrigger,
//   Tooltip,
// } from "react-bootstrap";
import PlaceholderButton from "react-bootstrap/esm/PlaceholderButton";
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataArray, DataPoint } from "./types/data";
import DataChoiceComponent from "./components/DataChoice";
// import ScatterPlot from "./components/ScatterPlot";
import { postPoints } from "./router/resources/data";
import { ListGroup } from "react-bootstrap";

function App() {
  const [exampleData, setExampleData] = useState<DataArray>();
  const [dataChoice, setDataChoice] = useState<string>();
  const [selected, setSelected] = useState<DataPoint>();
  const initialDataChoice = "1";

  useEffect(() => {
    initialDataChoice &&
    postPoints(initialDataChoice).then((exampleData) => {
      setExampleData(exampleData);
    });
  }, [initialDataChoice]);

  useEffect(() => {
    dataChoice && 
    setSelected(exampleData![parseInt(dataChoice, 10)]);
  }, [dataChoice]);

  function choiceMade(choice: string) {
    setDataChoice(choice);
  }

  return (  
    <>
    <div className="App">
      <header className="App-header"> GNN Explainer </header>      
      
      <DataChoiceComponent onChoiceMade={choiceMade} />
      <p>The selected molecule is toxic:</p>      
      
      {selected ? selected.y : null}
    </div>    
    </>  
  );
}

function Dashboard(){
  return(
    <>
    {/* <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Choose a molecule</Card.Title>
        <Card.Text>
          Here will be the graph to show whether the current molecule is toxic.
        </Card.Text>
        <Button variant="primary">Select</Button>
      </Card.Body>
    </Card> */}
    {/* <p>Hello World</p> */}
    <Container fluid>
        <Row lg="3">
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
              <Card.Title>Choose a molecule</Card.Title>
        <Card.Text>
          Here will be the graph to show whether the current molecule is toxic.
        </Card.Text>
        <Button variant="primary">Select</Button>
              </Card.Body>
              <Card.Footer>
                
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card className="card-stats" h-100>
              <Card.Body>
              <Card.Title>Customize your need</Card.Title>
        <Card.Text>
          Here will be several option for user to select their need.  
          <p>!</p>
          <p>!</p>
        </Card.Text>
        {/* <Button variant="primary">Confi</Button> */}
              </Card.Body>
              <Card.Footer>
                
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats" h-100>
              <Card.Body>
              <Card.Title>Mask Property</Card.Title>
        
        <ListGroup>
          <ListGroupItem>Size</ListGroupItem>
          <ListGroupItem>Entropy</ListGroupItem>
          <ListGroupItem>Max value</ListGroupItem>
        </ListGroup>
        
              </Card.Body>
              <Card.Footer>
                
              </Card.Footer>
            </Card>
          </Col>
          
          
        </Row>
        <p></p>
        <Row>
        <Col md="3" mh-100>
            <Card >
              <Card.Header>
                <Card.Title as="h4">Rank of Explainer</Card.Title>
                <p className="card-category">Rank</p>
              </Card.Header>
              <Card.Body>
                
              </Card.Body>
            </Card>
            <p>            
            </p>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Explainer performance</Card.Title>
                <p className="card-category">Figure</p>
              </Card.Header>
              <Card.Body>
                
              </Card.Body>
            </Card>
          </Col>          
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Graph Explaination</Card.Title>
                <p className="card-category">Graph</p>
              </Card.Header>
              <Card.Body>
                <p>!</p>
                <p>!</p>
                <p>!</p>
                <p>!</p>
              </Card.Body>
              </Card>
              
          </Col>
          <Col md="3">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Explainer performance</Card.Title>
                <p className="card-category">Figure</p>
              </Card.Header>
              <Card.Body>
              <p>!</p>
                <p>!</p>
                <p>!</p>
                <p>!</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <Row>
        <Col md="3">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Explainer performance</Card.Title>
                <p className="card-category">Figure</p>
              </Card.Header>
              <Card.Body>
                
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
        </Container>
      </>
  )
}
// <ScatterPlot width={1100} height={550} data={exampleData} graphid={dataChoice}/>
export default Dashboard;
