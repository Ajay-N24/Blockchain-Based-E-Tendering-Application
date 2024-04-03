import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.js';
import Login from './Screens/Login.jsx';
import Signup from './Screens/Signup.jsx';
import EmailEntry from './Screens/EmailEntry.jsx';
import Checkotp from './Components/CheckOtp.jsx';
import ChangePass from './Components/ChangePass.jsx';
import Tender from './Screens/Tender.jsx';
import { ToastContainer } from 'react-toastify';
import ViewTender from './Screens/ViewTender.jsx';
import CreateTender from './Screens/CreateTender.jsx';
import CATenders from './Screens/CATenders.jsx';
import store from './Store/store.js';
import { Provider } from 'react-redux';
import Logout from './Components/Logout.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/register" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/EmailEntry" element={<EmailEntry />} />
          <Route exact path="/CheckOtp" element={<Checkotp />} />
          <Route exact path="/ChangePass" element={<ChangePass />} />
          <Route exact path="/Tender" element={<Tender />} />
          <Route exact path="/ViewTender" element={<ViewTender />} />
          <Route exact path="/CreateTender" element={<CreateTender />} />
          <Route exact path="/CATenders" element={<CATenders />} />
        </Routes>
      </Router>
      <ToastContainer />
    </React.StrictMode>
  </Provider>
);
