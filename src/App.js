import SuperheroList from "./components/SuperheroesList/SuperheroList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SuperheroItem from "./components/SuperheroItem/SuperheroItem";
import CreateSuperhero from "./components/CreateSuperhero/CreateSuperhero";
import './base.scss';
import SuperheroesOverview from "./components/SuperheroesOverview/SuperheroesOverview";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<SuperheroesOverview/>}/>
                <Route path={'/:superheroId/*'} element={<SuperheroItem/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
