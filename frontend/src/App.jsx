import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {token && <Header />}
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/product/:id" element={token ? <ProductDetail /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;