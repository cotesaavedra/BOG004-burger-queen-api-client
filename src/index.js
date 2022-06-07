import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BurgerQueen} from './BurgerQueen';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <BurgerQueen />
  <ToastContainer />
  </>
)

reportWebVitals();
