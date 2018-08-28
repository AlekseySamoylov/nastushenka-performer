import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import ReactTable from "react-table";
import ReactInterval from 'react-interval';
import PieChart from 'react-minimal-pie-chart';
import * as axios from "axios";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username') == null ? ""
          : localStorage.getItem('username'),
      loggedIn: localStorage.getItem('loggedIn') == null ? false
          : localStorage.getItem('loggedIn'),
      tasks: JSON.parse(localStorage.getItem('taskData')) == null ? []
          : JSON.parse(localStorage.getItem('taskData')),
      newTaskName: "",
      q1: localStorage.getItem('q1') < 10 ? 10 : parseInt(
          localStorage.getItem('q1')),
      q2: localStorage.getItem('q2') < 10 ? 10 : parseInt(
          localStorage.getItem('q2')),
      q3: localStorage.getItem('q3') < 10 ? 10 : parseInt(
          localStorage.getItem('q3')),
      q4: localStorage.getItem('q4') < 10 ? 10 : parseInt(
          localStorage.getItem('q4')),
      taskIdToDelete: 0,
      lastId: localStorage.getItem('taskLastId') == null ?
          0 : localStorage.getItem('taskLastId'),
      openDisplay: 0,
      timeLogList: JSON.parse(localStorage.getItem('timeLogList')) == null ?
          [] : JSON.parse(localStorage.getItem('timeLogList')),
      closedTaskList: JSON.parse(localStorage.getItem('closedTaskList')) == null
          ?
          [] : JSON.parse(localStorage.getItem('closedTaskList')),
      isWorkReported: true,
      minutes: 30
    };

    this.login = this.login.bind(this);
    this.handleSaveData = this.handleSaveData.bind(this);
    App.sortTasks = App.sortTasks.bind(this);
    this.logTask = this.logTask.bind(this);
    this.reportBadWork = this.reportBadWork.bind(this);
    this.closeTask = this.closeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleKeyPressLogin = this.handleKeyPressLogin.bind(this);
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.createQ1Task = this.createQ1Task.bind(this);
    this.createQ2Task = this.createQ2Task.bind(this);
    this.createQ3Task = this.createQ3Task.bind(this);
    this.createQ4Task = this.createQ4Task.bind(this);
    this.clearAllData = this.clearAllData.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }

  sendNotification() {
    if (!("Notification" in window)) {
      alert("This browser does not support system notifications");
    }
    else if (Notification.permission === "granted") {
      new Notification("Report the time!");
    }

    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function(permission) {
        if (permission === "granted") {
          new Notification("Report the time!");
        }
      });
    }
  }

  handleKeyPressLogin(target) {
    if (target.charCode === 13) {
      this.login();
    }

  }

  login() {
    if (this.state.username.length > 2) {
      this.setState({
        loggedIn: true
      })
    }
  }

  clearAllData() {
    localStorage.clear();
    this.setState({
      username: "",
      loggedIn: false,
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
    localStorage.setItem('taskData', JSON.stringify(this.state.tasks));
    localStorage.setItem('timeLogList', JSON.stringify(this.state.timeLogList));
    localStorage.setItem('closedTaskList',
        JSON.stringify(this.state.closedTaskList));
    localStorage.setItem('taskLastId', this.state.lastId);
    localStorage.setItem('q1', this.state.q1);
    localStorage.setItem('q2', this.state.q2);
    localStorage.setItem('q3', this.state.q3);
    localStorage.setItem('q4', this.state.q4);
    localStorage.setItem('username', this.state.username);
    localStorage.setItem('loggedIn', this.state.loggedIn);
  }

  handleTaskNameChange(e) {
    this.setState({
      newTaskName: e.target.value
    })
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
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
      name: taskname,
      type: type
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
      taskType: task.type,
      taskName: task.name
    };
    let timeLogList = this.state.timeLogList.concat([taskForLog]);
    this.setState({
      timeLogList: timeLogList,
      isWorkReported: true,
      openDisplay: 2
    });
    localStorage.setItem("timeLogList", JSON.stringify(timeLogList));
    if (task.type === 'q1') {
      this.setState({q1: this.state.q1 + 10})
    } else if (task.type === 'q2') {
      this.setState({q2: this.state.q2 + 10})
    } else if (task.type === 'q3') {
      this.setState({q3: this.state.q3 + 10})
    } else {
      this.setState({q4: this.state.q4 + 10})
    }

    axios.post('/api/userlog', {
      username: this.state.username,
      taskName: task.name,
      taskType: task.type
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
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
    axios.post('/api/userlog', {
      username: this.state.username,
      taskName: "auto reported",
      taskType: "q4"
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  closeTask(task) {
    console.log("Close " + this.state.closedTaskList.size);
    let taskToClose = {
      time: new Date(),
      taskType: task.type,
      taskName: task.name
    };
    let closedTaskList = this.state.closedTaskList.concat([taskToClose]);
    this.setState({
      closedTaskList: closedTaskList,
      isWorkReported: true
    });
    localStorage.setItem("closedTaskList", JSON.stringify(closedTaskList));
    if (task.type === 'q1') {
      this.setState({q1: this.state.q1 + 10})
    } else if (task.type === 'q2') {
      this.setState({q2: this.state.q2 + 10})
    } else if (task.type === 'q3') {
      this.setState({q3: this.state.q3 + 10})
    } else {
      this.setState({q4: this.state.q4 + 10})
    }
    this.deleteTask(task.id);
    axios.post('/api/userlog', {
      username: this.state.username,
      taskName: task.name,
      taskType: task.type
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Nastushenka Performer</h1>
            <p>{this.state.minutes} min before reporting</p>
          </header>
          <br/>
          <div className="container" hidden={this.state.loggedIn}>
            <FormGroup>
              <ControlLabel htmlFor="username">Enter username</ControlLabel>
              <FormControl
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  onKeyPress={this.handleKeyPressLogin}
                  id="username" type="text"/>
            </FormGroup>
            <FormGroup>
              <Button
                  className="btn-dark"
                  onClick={this.login}>
                Login
              </Button>
            </FormGroup>
          </div>
          <div hidden={!this.state.loggedIn}>
            <div className="container">
              <Button
                  className="btn-dark"
                  onClick={() => {
                    this.setState({
                      openDisplay: this.state.openDisplay === 2 ? 1
                          : this.state.openDisplay === 1 ? 0 : 2
                    })
                  }}>Switch</Button>
            </div>
            <div>
              <ReactInterval
                  timeout={1000 * 5}
                  enabled={true}
                  callback={this.handleSaveData}/>
              <ReactInterval
                  timeout={1000 * 60}
                  enabled={true}
                  callback={() => {
                    this.setState({
                      minutes: --this.state.minutes
                    })
                  }}/>
              <ReactInterval
                  timeout={1000 * 60 * 30}
                  enabled={true}
                  callback={() => {
                    this.setState({
                      openDisplay: 1,
                      isWorkReported: false
                    });
                    this.sendNotification();
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
                                className={row.value.type}
                                value={row.value}
                                onClick={() => this.logTask(row.value)}>
                              {row.value.name}
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
                                className="btn-success"
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
              </div>
              <div className="container">
                <ReactTable
                    data={this.state.tasks}
                    columns={[
                      {
                        Header: "Task name",
                        id: "taskNameColumn",
                        accessor: task => task,
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
                            <Button className="btn-danger" value={row.value}
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
              <br/>
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
          </div>
          <br/>
          <br/>
          <Button className="btn-danger" onClick={this.clearAllData}>
            Clear All Data
          </Button>
          <Button onClick={this.sendNotification}>Test notification</Button>
          <p hidden={!this.state.loggedIn} className="App-intro">
            Thank you for your attention, {this.state.username}
          </p>
          <br/>
          <p>GDPR compliant APP</p>
        </div>
    );
  }
}

export default App;
