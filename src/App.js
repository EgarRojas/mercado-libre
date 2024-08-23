import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBox from './components/SearchBox/SearchBox';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App() {
  return (
    <Router>
      <div>
        <SearchBox /> {/* SearchBox remains at the top across all routes */}
        <Routes>
          <Route path="/" element={<div></div>} /> {/* Empty div for home path */}
          <Route path="/items" element={<div></div>} /> {/* Empty div for items path */}
          <Route path="/item/:id" element={<ProductDetails />} /> {/* ProductDetails displayed with SearchBox */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
