import React, { Component } from 'react'
import { Table, Button, Popconfirm, Modal, Form, Input } from 'antd'
import Header from '../Header'
import EditableCell from './EditableCell'
const FormItem = Form.Item


class App extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      columns: [],
      visible: false,
      newDataItem: {}
    }
  }
  getData(nextProps) {
    fetch(`http://zhatk.loc/get.php?table=${nextProps.routeParams.table}`, {
    }).then(response => response.json()).then(data => {
      const columns = Object.keys(data[0]).map(item => {
        return {
          title: item,
          dataIndex: item,
          key: item,
          render: (text, record) => this.renderColumns(text, record, item)
        }
      })

      columns.push({
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record

          return (
            <div className='editable-row-operations'>
              {
                editable ?
                  <span>
                    <Button onClick={() => this.save(record['Код'])}>Save</Button>
                    <Popconfirm title='Sure to cancel?' onConfirm={() => this.cancel(record['Код'])}>
                      <Button>Cancel</Button>
                    </Popconfirm>
                  </span>
                  : (
                    <div>
                      <Button onClick={() => this.edit(record['Код'])}>Edit</Button>
                      {
                        this.state.data.length > 1 ?
                          (
                            <Popconfirm title='Sure to delete?' onConfirm={() => this.onDelete(record['Код'])}>
                              <Button>Delete</Button>
                            </Popconfirm>
                          ) : null
                      }
                    </div>
                  )
              }

            </div>
          )
        }
      })
      this.setState({ data: data.sort((a, b) => a['Код'] - b['Код']), columns })
    })
  }

  componentDidMount() {
    this.getData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.getData(nextProps)
  }

  handleChange(value, key, column) {
    debugger
    const newData = this.state.data
    const target = newData.find(item => key === item['Код'])

    if (target) {
      target[column] = value
      this.setState({ data: newData })
    }
  }
  edit(key) {
    const newData = [ ...this.state.data ]
    const target = newData.find(item => key === item['Код'])

    if (target) {
      target.editable = true
      this.setState({ data: newData })
    }
  }
  save(key) {
    const newData = [ ...this.state.data ]
    const target = newData.find(item => key === item['Код'])
    const data = {
      ...target,
      table: this.props.routeParams.table
    }

    fetch('http://zhatk.loc/save.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `arrObjects=${JSON.stringify(data)}`
    })
    if (target) {
      delete target.editable
      this.setState({ data: newData })
    }
  }
  cancel(key) {
    const newData = [ ...this.state.data ]
    const target = newData.find(item => key === item['Код'])

    if (target) {
      Object.assign(target, this.state.data.find(item => key === item['Код']))
      delete target.editable
      this.setState({ data: newData })
    }
  }
  onDelete = (key) => {
    const dataSource = [ ...this.state.data ]
    const data = {
      'Код': key,
      table: this.props.routeParams.table
    }

    fetch('http://zhatk.loc/remove.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `arrObjects=${JSON.stringify(data)}`
    })
    this.setState({ data: dataSource.filter(item => item['Код'] !== key) })
  }
  showModal = () => {
    const newDataItem = {}

    for (let i = 0; i < this.state.columns.length; i++) {
      if (i > 0 && i < this.state.columns.length - 1) {
        newDataItem[this.state.columns[i].key] = null
      }
    }
    this.setState({
      visible: true,
      newDataItem
    })
  }
  handleOk = (e) => {
    const data = {
      ...this.state.newDataItem,
      table: this.props.routeParams.table
    }

    fetch('http://zhatk.loc/add.php', {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `arrObjects=${JSON.stringify(data)}`
    }).then(() => this.getData(this.props))
    this.setState({
      visible: false
    })
  }
  handleChangeSaveForm = (e) => {
    const { newDataItem } = this.state

    newDataItem[e.target.name] = e.target.value
    this.setState({
      newDataItem
    })
  }
  handleCancel = () => this.setState({ visible: false })


  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record['Код'], column)}
      />
    )
  }

  render() {
    return (
      <div>
        <Modal
          title='Add row to table'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {
            this.state.columns.map((item, index) => {
              if (index > 0 && index < this.state.columns.length - 1) {
                return (
                  <FormItem
                    key={index}
                    label={item.key}
                  >
                    <Input value={this.state.newDataItem[item.key]} name={item.key} onChange={this.handleChangeSaveForm} />
                  </FormItem>
                )
              }
            })
          }
        </Modal>
        <Header />
        <Button className='editable-add-btn' onClick={this.showModal}>Add row</Button>
        <Table columns={this.state.columns} dataSource={this.state.data} />
      </div>
    )
  }
}

export default App
