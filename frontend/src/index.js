import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home';
import Proprieties from './pages/Proprieties';
import PropertiesPage from './pages/PropertiesPage';
import Properties from './pages/Proprieties';
import SingleProperties from './pages/SingleProperties';
import Contact from './pages/Contact';
import Apply from './pages/Apply';
import Application from './pages/Application';
import ApplicationTwo from './pages/ApplicationTwo';
import ApplicationThree from './pages/ApplicationThree';
import ApplicationFour from './pages/ApplicationFour';
import ApplicationFive from './pages/ApplicationFive';
import ApplicationAttach from './pages/ApplicationAttach';
import ApplicationQuestions from './pages/ApplicationQuestions';
import ApplicationFees from './pages/ApplicationFees';
import Confirm from './pages/Confirm';
import FormContact from './components/FormContact';
import ReviewAndConfirm from './pages/Confirm';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Payment from './pages/Payment';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProprietyList from './pages/ProprietyListAdmin';
import MaintenanceRequestForm from './pages/MaintenanceRequestForm';
import ProprietyListAdmin from './pages/ProprietyListAdmin';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/properties' element={<Properties />} />
      <Route path='/product/:id' element={<SingleProperties />} />
      <Route path='/contact/:id' element={<Contact />} />
      <Route path='/contact' element={<FormContact />} />
      <Route path='/apply/:id' element={<Apply />} />
      <Route path='/rental-application' element={<Application />} />
      <Route path='/where-youve-lived' element={<ApplicationTwo />} />
      <Route path='/co-applicants' element={<ApplicationThree />} />
      <Route path='/personal-information' element={<ApplicationFour />} />

      <Route path='/your-income' element={<ApplicationFive />} />
      <Route path='/attach-documents' element={<ApplicationAttach />} />

      <Route path='/questions' element={<ApplicationQuestions />} />
      <Route path='/pay-fees' element={<ApplicationFees />} />
      <Route path='/review-confirm' element={<ReviewAndConfirm />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/maintenance' element={<MaintenanceRequestForm />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/proprietyList' element={<ProprietyListAdmin />} />
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
