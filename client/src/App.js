import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home'
import PrivacyPolicy from './components/pages/Privacy Policy';
import PostJobs from './components/pages/Post Jobs';
import SignUp from './components/pages/sign-up';



function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact Component=
        {Home} />
        <Route path='/Privacy Policy' Component={PrivacyPolicy} 
        />
        <Route path='/Post Jobs' Component={PostJobs} 
        />
        <Route path='/sing-uP' Component={SignUp} />
      </Routes>
      </Router>
      </> 
  );
}

export default App;
