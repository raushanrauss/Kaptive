import React from 'react'
import {  Route, Routes } from 'react-router-dom';

import Charts from '../Component/Charts';

import Tables from '../Component/Tables';
import SalesChart from '../Component/Reports';
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Charts />}/>
        <Route path='/table' element={<Tables />}/>
        <Route path='/report' element={<SalesChart />}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
