import React from 'react'
import {  Route, Routes } from 'react-router-dom';

import Charts from '../Component/Charts';

import Tables from '../Component/Tables';
import SalesChart from '../Component/Reports';
import ForecastReport from '../Component/Forecast';
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Charts />}/>
        <Route path='/table' element={<Tables />}/>
        <Route path='/report' element={<SalesChart />}/>
        <Route path='/forcast' element={<ForecastReport />}/>
      </Routes>
    </div>
  )
}

export default AllRoutes
