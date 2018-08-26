import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import ReactTable from "react-table";
import ReactInterval from 'react-interval';
import PieChart from 'react-minimal-pie-chart';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: JSON.parse(localStorage.getItem('taskData')) == null ? []
          : JSON.parse(localStorage.getItem('taskData')),
      newTaskName: "",
      q1: localStorage.getItem('q1') < 10 ? 10
          : parseInt(localStorage.getItem('q1')),
      q2: localStorage.getItem('q2') < 10 ? 10
          : parseInt(localStorage.getItem('q2')),
      q3: localStorage.getItem('q3') < 10 ? 10
          : parseInt(localStorage.getItem('q3')),
      q4: localStorage.getItem('q4') < 10 ? 10
          : parseInt(localStorage.getItem('q4')),
      taskIdToDelete: 0,
      lastId: localStorage.getItem('taskLastId') == null ? 0
          : localStorage.getItem('taskLastId'),
      openDisplay: 0,
      timeLogList: JSON.parse(localStorage.getItem('timeLogList')) == null ? []
          : JSON.parse(localStorage.getItem('timeLogList')),
      closedTaskList: JSON.parse(localStorage.getItem('closedTaskList')) == null
          ? []
          : JSON.parse(localStorage.getItem('closedTaskList')),
      isWorkReported: true
    };

    this.handleSaveData = this.handleSaveData.bind(this);
    App.sortTasks = App.sortTasks.bind(this);
    this.logTask = this.logTask.bind(this);
    this.reportBadWork = this.reportBadWork.bind(this);
    this.closeTask = this.closeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.createQ1Task = this.createQ1Task.bind(this);
    this.createQ2Task = this.createQ2Task.bind(this);
    this.createQ3Task = this.createQ3Task.bind(this);
    this.createQ4Task = this.createQ4Task.bind(this);
    this.clearAllData = this.clearAllData.bind(this);
  }

  clearAllData() {
    localStorage.clear();
    this.setState({
      tasks: [],
      newTaskName: "",
      q1: 10,
      q2: 10,
      q3: 10,
      q4: 10,
      taskIdToDelete: 0,
      lastId: 0,
      openDisplay: 0,
      timeLogList: [],
      closedTaskList: [],
      isWorkReported: true
    })
  }
  handleSaveData() {
    console.log("Data saved");
    localStorage.setItem('taskData', JSON.stringify(this.state.tasks));
    localStorage.setItem('timeLogList', JSON.stringify(this.state.timeLogList));
    localStorage.setItem('closedTaskList',
        JSON.stringify(this.state.closedTaskList));
    localStorage.setItem('taskLastId', this.state.lastId);
    localStorage.setItem('q1', this.state.q1);
    localStorage.setItem('q2', this.state.q2);
    localStorage.setItem('q3', this.state.q3);
    localStorage.setItem('q4', this.state.q4);
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
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== taskId),
      taskIdToDelete: this.state.taskIdToDelete
    });
    this.handleSaveData();
  }

  logTask(task) {
    let taskForLog = {
      time: new Date(),
      taskType: task.field.type,
      taskName: task.field.name
    };
    let timeLogList = this.state.timeLogList.concat([taskForLog]);
    this.setState({
      timeLogList: timeLogList,
      isWorkReported: true,
      openDisplay: 2
    });
    localStorage.setItem("timeLogList", JSON.stringify(timeLogList));
    if (task.field.type === 'q1') {
      this.setState({q1: this.state.q1 + 10})
    } else if (task.field.type === 'q2') {
      this.setState({q2: this.state.q2 + 10})
    } else if (task.field.type === 'q3') {
      this.setState({q3: this.state.q3 + 10})
    } else {
      this.setState({q4: this.state.q4 + 10})
    }
  }

  reportBadWork() {
    let taskForLog = {
      time: new Date(),
      taskType: "q4",
      taskName: "auto reported"
    };
    let timeLogList = this.state.timeLogList.concat([taskForLog]);
    this.setState({
      timeLogList: timeLogList,
      isWorkReported: true
    });
    localStorage.setItem("timeLogList", JSON.stringify(timeLogList));
    this.setState({q4: this.state.q4 + 10});
  }

  closeTask(task) {
    console.log("Close " + this.state.closedTaskList.size);
    let taskToClose = {
      time: new Date(),
      taskType: task.field.type,
      taskName: task.field.name
    };
    let closedTaskList = this.state.closedTaskList.concat([taskToClose]);
    this.setState({
      closedTaskList: closedTaskList,
      isWorkReported: true
    });
    localStorage.setItem("closedTaskList", JSON.stringify(closedTaskList));
    if (task.field.type === 'q1') {
      this.setState({q1: this.state.q1 + 10})
    } else if (task.field.type === 'q2') {
      this.setState({q2: this.state.q2 + 10})
    } else if (task.field.type === 'q3') {
      this.setState({q3: this.state.q3 + 10})
    } else {
      this.setState({q4: this.state.q4 + 10})
    }
    this.deleteTask(task.id);
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Nastushenka Performer</h1>
          </header>
          <br/>
          <div className="container">
            <Button onClick={() => {
              this.setState({
                openDisplay: this.state.openDisplay === 0 ? 1
                    : this.state.openDisplay === 1 ? 2 : 0
              })
            }}>Switch</Button>
          </div>
          <div>
            <ReactInterval
                timeout={1000 * 5}
                enabled={true}
                callback={this.handleSaveData}/>
            <ReactInterval
                timeout={1000 * 60 * 30}
                enabled={true}
                callback={() => {
                  this.setState({
                    openDisplay: 1,
                    isWorkReported: false
                  });
                  setTimeout(() => {
                    if (!this.state.isWorkReported) {
                      this.reportBadWork();
                      this.setState({
                        isWorkReported: true,
                        openDisplay: 0
                      })
                    }
                  }, 1000 * 60 * 5)
                }}/>
          </div>
          <div hidden={this.state.openDisplay !== 1} className="container">
            <h1>Log your work in last 30 minutes</h1>
            <div className="container">
              <ReactTable
                  data={this.state.tasks}
                  columns={[
                    {
                      Header: "Task in progress",
                      id: "taskLogButton",
                      accessor: task => task,
                      Cell: row => (
                          <Button
                              className={row.value.field.type}
                              value={row.value}
                              onClick={() => this.logTask(row.value)}>
                            {row.value.field.name}
                          </Button>
                      )
                    },
                    {
                      Header: "Task Finished",
                      id: "taskCloseButton",
                      accessor: task => task,
                      maxWidth: 200,
                      Cell: row => (
                          <Button
                              value={row.value.id}
                              onClick={() => this.closeTask(row.value)}>
                            Close the task
                          </Button>
                      )
                    }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
              />
            </div>
          </div>
          <div hidden={this.state.openDisplay !== 0} className="container">
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
                      style={{background: "#daa520"}}
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
          <div hidden={this.state.openDisplay !== 2} className="container">
            <div className="container">
              <PieChart style={{height: 150}}
                        animate={true}
                        lineWidth={50}
                        data={[
                          {value: this.state.q1, color: '#c13932'},
                          {value: this.state.q2, color: '#40aa40'},
                          {value: this.state.q3, color: '#559faa'},
                          {value: this.state.q4, color: '#daa520'}
                        ]}
              />
              <h2>Logged work</h2>
              <ReactTable
                  data={this.state.timeLogList}
                  columns={[
                    {
                      Header: "Time",
                      maxWidth: 200,
                      accessor: "time",
                      Cell: row => (
                          <p>{row.value.toString()}</p>
                      )
                    },
                    {
                      Header: "Task Type",
                      maxWidth: 200,
                      accessor: "taskType",
                      Cell: row => (
                          <div className={row.value}>
                            <p>{row.value}</p>
                          </div>
                      )
                    },
                    {
                      Header: "Task Name",
                      accessor: "taskName",
                      Cell: row => (
                          <p>{row.value}</p>
                      )
                    }
                  ]}
                  defaultPageSize={5}
                  className="-striped -highlight"
              />
              <h2>Completed work</h2>
              <ReactTable
                  data={this.state.closedTaskList}
                  columns={[
                    {
                      Header: "Time",
                      maxWidth: 200,
                      accessor: "time",
                      Cell: row => (
                          <p>{row.value.toString()}</p>
                      )
                    },
                    {
                      Header: "Task Type",
                      maxWidth: 200,
                      accessor: "taskType",
                      Cell: row => (
                          <div className={row.value}>
                            <p>{row.value}</p>
                          </div>
                      )
                    },
                    {
                      Header: "Task Name",
                      accessor: "taskName",
                      Cell: row => (
                          <p>{row.value}</p>
                      )
                    }
                  ]}
                  defaultPageSize={5}
                  className="-striped -highlight"
              />
            </div>
          </div>
          <Button className="btn-danger" onClick={this.clearAllData}>
            Clear All Data
          </Button>
          <p className="App-intro">
            Thank you for your attention
          </p>
        </div>
    );
  }
}

export default App;
