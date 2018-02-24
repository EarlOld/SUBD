import React from 'react'
import { Route }  from 'react-router'
import App from './components/App'
import Header from './components/Header'
import Edit from './components/Edit'
import Add from './components/Add'

export default (
  <div>
    <Route component={App} path='/' />
    <Route component={App} path='/watch/:table' />
    <Route component={Edit} path='/edit' />
    <Route component={Add} path='/add' />
  </div>
)
