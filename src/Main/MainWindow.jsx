import React, { useState } from 'react'
import Form from './Input/Form.jsx'
import Table from './Results/Table.jsx'

export default function MainWindow() {
  const [showingdata,setshowingdata] = useState([]);
  return (
    <div className="row m-0">
        <Form setshowingdata={setshowingdata} />
        <Table data={showingdata} />
    </div>
  )
}
