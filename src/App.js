import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import ReactTable from "react-table";

class App extends Component {

  render() {
    const tasks = [{
      id: 1,
      name: "MMRU-1111: Add credit policy to ...",
      deleteUrl: "/delete/2",
      type: 1
    }, {
      id: 2,
      name: "Read the book Kotlin in action",
      deleteUrl: "/delete/2",
      type: 2
    }];
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to Nastushenka Performer App</h1>
          </header>
          <br/>
          <div class="container">
            <form id="myForm">
              <FormGroup>
                <ControlLabel htmlFor="taskName">Enter task name</ControlLabel>
                <FormControl id="taskName" type="text"/>
              </FormGroup>
              <FormGroup>
                <Button class="q1">Important and Urgent</Button>
                <Button>Important and Not Urgent</Button>
              </FormGroup>
              <FormGroup>
                <Button>Not Important and Urgent</Button>
                <Button>Not Important and Not Urgent</Button>
              </FormGroup>
            </form>
          </div>
          <div class="container">
            <ReactTable
              data={tasks}
              columns={[
                {
                  Header: "Name",
                  accessor: "name"
                },
                {
                  Header: "Delete",
                  accessor: "deleteUrl",
                  maxWidth: 250
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </div>
          <p className="App-intro">
            Thank you for your attention
          </p>
        </div>
    );
  }
}

export default App;
