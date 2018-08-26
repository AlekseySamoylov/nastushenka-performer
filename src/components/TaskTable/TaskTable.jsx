import React, {Component} from 'react'
import ReactTable from "react-table";

// TODO: Delete
class TaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = []
  }

  render() {
    return (
        <ReactTable
            data={this.state}
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
    )
  }

}
