import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBox from './components/SearchBox/SearchBox';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  return (
    <Router>
      <div>
        <SearchBox /> 
        <Routes>
          <Route path="/" element={<div></div>} /> 
          <Route path="/items" element={<div></div>} /> 
          <Route path="/item/:id" element={<ProductDetails />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
