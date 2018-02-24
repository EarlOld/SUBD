import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router'
const SubMenu = Menu.SubMenu

class Header extends Component {
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        mode='horizontal'
      >
        <Menu.Item key='watch:1'>
          <Link to='/watch/object'><Icon type='eye-o' />Будівельний об*єкт</Link>
        </Menu.Item>
        <Menu.Item key='watch:2'>
          <Link to='/watch/organiz'><Icon type='eye-o' />Організації</Link>
        </Menu.Item>
        <Menu.Item key='watch:3'>
          <Link to='/watch/galuzi'><Icon type='eye-o' />Галузі</Link>
        </Menu.Item>
        <Menu.Item key='watch:4'>
          <Link to='/watch/regions'><Icon type='eye-o' />Регіони</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Header
