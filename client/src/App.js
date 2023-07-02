import AppRoutes from './routes/AppRoutes';
import './App.css';
import { Header } from './components';

// import 'react-toastify/dist/ReactToastify.css';
// <ToastContainer autoClose={4000} />

function App() {
  return (
    <div className="App">
      Hello, Sport Zone!!!
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;