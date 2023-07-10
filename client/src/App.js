import AppRoutes from './routes/AppRoutes';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={4000} />
      <AppRoutes />
    </div>
  );
}

export default App;