import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Task from './component/Task';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
          <Route  path="/" element={<Task />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;