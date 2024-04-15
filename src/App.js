import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import CreateStudent from './pages/Student/CreateStudent'
import CreateTeacher from './pages/Teacher/CreateTeacher'
import {BrowserRouter ,Routes ,Route} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home />}></Route>
          <Route path="/teacher/create" element={ <CreateTeacher />}></Route>
          <Route path="/student/create" element={ <CreateStudent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
