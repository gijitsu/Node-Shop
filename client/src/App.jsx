import Products from './components/Products';
import Layout from './Layouts/Layout';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Home from './pages/Home';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/detail" element={<ProductDetail/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App
