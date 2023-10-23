import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import CodeShare from './pages/Codeshare';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <div>
        <Toaster
          position="top-right"
          //change color of toast
          toastOptions={{
            style: {
              background: '#282a36',
              color: '#fff',
              //tick color to blue

            },
          }}
        >
        </Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:roomId" element={<CodeShare />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
