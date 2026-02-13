import { Route, Routes } from 'react-router-dom';
import ProposalPage from './pages/ProposalPage';
import YesPage from './pages/YesPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProposalPage />} />
      <Route path="/yes" element={<YesPage />} />
    </Routes>
  );
}
