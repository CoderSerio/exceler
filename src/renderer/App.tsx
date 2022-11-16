import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import "tailwindcss/tailwind.css";
import { RouterTab } from './components/Tabs/RouterTab';


import './App.css';

export default function App() {
  return (
    <Router>
      <RouterTab />
    </Router>
  );
}
