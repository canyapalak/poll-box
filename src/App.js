import "./index.css";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage.js";
import { PollsContext } from "./store/PollsContext.js";
import PollPage from "./views/PollPage";
import CreatePoll from "./views/CreatePoll";
import AppContainer from "./components/AppContainer";
import NavBar from "./components/NavBar";

function App() {
  const { allPolls } = useContext(PollsContext);
  const { isLoading } = useContext(PollsContext);

  return (
    <AppContainer>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<HomePage allPolls={allPolls} isLoading={isLoading} />}
        />
        <Route path="/:id" element={<PollPage />} />
        <Route path="/newpoll" element={<CreatePoll />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
