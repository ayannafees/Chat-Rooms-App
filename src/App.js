import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';
import HomeScreen from './HomeScreen';

function App() {
  const [{user}, dispatch] = useStateValue();


  //New component for responsiveness
  const [click,setClick] = useState(true);
  const handleClick = () => setClick(!click);
  //End of New component for responsiveness

  return (
    //BEM  naming convention
    <div className="app">

      {!user ? (
        <Login/>
        ) : (
          <div className="app__body">
            {/* <Sidebar/> */}

            {/* New component for responsiveness */}
            <Sidebar  state={click} onStateChange={handleClick}/>
            {/* End of New component for responsiveness */}

            <Routes>
              {/* New component for responsiveness */}
              <Route path='/rooms/:roomId' element={<Chat  state={click} onStateChange={handleClick}/>}/>
              {/* End of New component for responsiveness */}

              {/* <Route path='/rooms/:roomId' element={<Chat/>}/> */}
                
              <Route path='/' element={<HomeScreen/>}>
                
              </Route>
            </Routes>

          </div>
        )
      }
    </div>
  );
}

export default App;
