import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LayoutFrame from "./components/Layout";
import Discover from "./views/Discover";
import Musician from "./views/Musician";
import PlayList from "./views/PlayList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<LayoutFrame />}>
              <Route index element={<Navigate to="discover" />}></Route>
              <Route path="discover" element={<Discover />}></Route>
              <Route path="musician" element={<Musician />}></Route>
              <Route path="playlist" element={<PlayList />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
