import './main.global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Components/Layout';
import { Header } from './Components/Header';
import { Main } from './Components/Layout/Main';
import { Statistics } from './Components/Layout/Statistics';

function App() {
 
  return (
    <BrowserRouter>
      <Layout>
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
