
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Output } from './components/output';
import SignupFormDemo from "./components/ui/form";


const App: React.FC = () => {
  return <BrowserRouter>
  <Routes>
    <Route path="/input" element={<SignupFormDemo/>}></Route>
      
      <Route path="/output" element={<Output />} />
    
  </Routes>
</BrowserRouter>
};

export default App;
