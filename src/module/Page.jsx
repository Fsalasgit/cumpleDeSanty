import { useState } from "react";
import NavBar from "./nav/NavBar";
import PlayersPage from "./players/PlayersPage";
import StoryPage from "./story/StoryPage";
import TriviaPage from "./trivia/TriviaPage";
import RobloxAvatarUploader from "./robloxtizate/RobloxAvatarUploader.jsx";

export default function Page() {
  const [tab, setTab] = useState("players");
  const [players, setPlayers] = useState([]);

  return (
    <div className="app">
      <NavBar tab={tab} setTab={setTab} />
      <main className="main-content">
        {tab === "players" && <PlayersPage players={players} setPlayers={setPlayers} />}
        {tab === "story" && <StoryPage players={players} />}
        {tab === "trivia" && <TriviaPage />}
        {tab === "robloxtizate" && <RobloxAvatarUploader />}
      </main>
    </div>
  );
}

