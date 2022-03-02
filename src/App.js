import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main';
import Post from './components/Post';
import Selected from './components/Selected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path = "/" element = {<Main />}/>
          <Route path = "Post" element = {<Post />}/>
          <Route path = "Selected" element = {<Selected />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
