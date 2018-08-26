import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import ReactTable from "react-table";
import ReactInterval from 'react-interval';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: JSON.parse(localStorage.getItem('taskData')) == null ? []
          : JSON.parse(localStorage.getItem('taskData')),
      newTaskName: "",
      taskIdToDelete: 0,
      lastId: localStorage.getItem('taskLastId') == null ? 0
          : localStorage.getItem('taskLastId'),
      isReportTaskOpen: false
    };

    this.handleSaveData = this.handleSaveData.bind(this);
    App.sortTasks = App.sortTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.createQ1Task = this.createQ1Task.bind(this);
    this.createQ2Task = this.createQ2Task.bind(this);
    this.createQ3Task = this.createQ3Task.bind(this);
    this.createQ4Task = this.createQ4Task.bind(this);
  }

  handleSaveData() {
    localStorage.setItem('taskData', JSON.stringify(this.state.tasks));
    localStorage.setItem('taskLastId', this.state.lastId);
  }

  handleTaskNameChange(e) {
    this.setState({
      tasks: this.state.tasks,
      newTaskName: e.target.value,
      taskIdToDelete: this.state.taskIdToDelete,
      lastId: this.state.lastId
    })
  }

  createQ1Task() {
    this.setState({
      tasks: App.sortTasks(this.state.tasks.concat(
          App.createTasksToConcat(
              this.state.newTaskName,
              "q1",
              ++this.state.lastId,
              1000))),
      newTaskName: "",
      taskIdToDelete: 0,
    });
    this.handleSaveData();
  }

  createQ2Task() {
    this.setState({
      tasks: App.sortTasks(this.state.tasks.concat(
          App.createTasksToConcat(
              this.state.newTaskName,
              "q2",
              ++this.state.lastId,
              2000))),
      newTaskName: "",
      taskIdToDelete: 0,
    });
    this.handleSaveData();
  }

  createQ3Task() {
    this.setState({
      tasks: App.sortTasks(this.state.tasks.concat(
          App.createTasksToConcat(
              this.state.newTaskName,
              "q3",
              ++this.state.lastId,
              3000))),
      newTaskName: "",
      taskIdToDelete: 0,
    });
    this.handleSaveData();
  }

  createQ4Task() {
    this.setState({
      tasks: App.sortTasks(this.state.tasks.concat(
          App.createTasksToConcat(
              this.state.newTaskName,
              "q4",
              ++this.state.lastId,
              4000))),
      newTaskName: "",
      taskIdToDelete: 0,
    });
    this.handleSaveData();
  }

  static createTasksToConcat(taskname, type, id, sort) {
    const task = {
      id: id,
      sort: sort,
      field: {
        name: taskname,
        type: type
      }
    };
    return [task];
  }

  static sortTasks(tasks) {
    function compare(a, b) {
      if (a.sort < b.sort) {
        return -1;
      } else if (a.sort > b.sort) {
        return 1;
      } else {
        return 0;
      }
    }

    return tasks.sort(compare)
  }

  deleteTask(taskId) {
    console.log("Hello " + taskId);
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== taskId),
      taskIdToDelete: this.state.taskIdToDelete
    });
    this.handleSaveData();
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to Nastushenka Performer App</h1>
          </header>
          <br/>
          <div>
            <ReactInterval
                timeout={1000 * 5}
                enabled={!this.state.isReportTaskOpen}
                callback={() => {
                  console.log("Hello open w " + this.state.lastId);
                  this.setState({
                    isReportTaskOpen: true
                  })
                }}/>
            <ReactInterval
                timeout={1000 * 2}
                enabled={this.state.isReportTaskOpen}
                callback={() => {
                  console.log("Hello close w " + this.state.lastId);
                  this.setState({
                    isReportTaskOpen: false
                  })
                }}/>
          </div>
          <div hidden={!this.state.isReportTaskOpen} className="container">
            <h1>Log last task work</h1>
            <div className="container">
              <ReactTable
                  data={this.state.tasks}
                  columns={[
                    {
                      Header: "Task in progress",
                      accessor: "field",
                      Cell: row => (
                          <Button className={row.value.type}>
                            {row.value.name}
                          </Button>
                      )
                    },
                    {
                      Header: "Task Finished",
                      accessor: "id",
                      maxWidth: 200,
                      Cell: row => (
                          <Button value={row.value}
                                  onClick={() => this.deleteTask(row.value)}>
                            Delete
                          </Button>
                      )
                    }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
              />
            </div>
          </div>
          <div hidden={this.state.isReportTaskOpen} className="container">
            <div className="container">
              <h1>Manage your tasks</h1>
              <form id="myForm">
                <FormGroup>
                  <ControlLabel htmlFor="taskName">Enter task
                    name</ControlLabel>
                  <FormControl
                      value={this.state.newTaskName}
                      onChange={this.handleTaskNameChange}
                      id="taskName" type="text"/>
                </FormGroup>
                <FormGroup>
                  <Button
                      disabled={this.state.newTaskName.length < 5}
                      style={{background: "#c13932"}}
                      onClick={this.createQ1Task}>
                    Important and Urgent
                  </Button>
                  <Button
                      disabled={this.state.newTaskName.length < 5}
                      style={{background: "#40aa40"}}
                      onClick={this.createQ2Task}>
                    Important and Not Urgent
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Button
                      disabled={this.state.newTaskName.length < 5}
                      style={{background: "#559faa"}}
                      onClick={this.createQ3Task}>
                    Not Important and Urgent
                  </Button>
                  <Button
                      disabled={this.state.newTaskName.length < 5}
                      style={{background: "#aaa950"}}
                      onClick={this.createQ4Task}>
                    Not Important and Not Urgent
                  </Button>
                </FormGroup>
              </form>
            </div>
            <div className="container">
              <ReactTable
                  data={this.state.tasks}
                  columns={[
                    {
                      Header: "Task name",
                      accessor: "field",
                      Cell: row => (
                          <div className={row.value.type}>
                            <p>{row.value.name}</p>
                          </div>
                      )
                    },
                    {
                      Header: "Delete",
                      accessor: "id",
                      maxWidth: 200,
                      Cell: row => (
                          <Button value={row.value}
                                  onClick={() => this.deleteTask(row.value)}>
                            Delete
                          </Button>
                      )
                    }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
              />
            </div>
          </div>
          <p className="App-intro">
            Thank you for your attention
          </p>
        </div>
    );
  }
}

export default App;
