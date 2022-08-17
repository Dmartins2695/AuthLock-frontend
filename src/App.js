import {Route, BrowserRouter, Routes} from "react-router-dom";
import {Home} from './pages/home/Home'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/*' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}




export default App
