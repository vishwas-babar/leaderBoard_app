import React, { useState } from "react";
import UserSelector from "./components/UserSelector";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/LeaderBoard";
import AddUserModal from "./components/AddUserModal";
import ClaimHistory from "./components/ClaimHistory";

const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState("");


  return (
    <div className="text-center mt-12">
      <AddUserModal reloadUsers={() => { }} />
      <ClaimHistory />
      <h1 className="text-4xl font-bold mb-8">Leaderboard App</h1>
      <div className="space-y-4">
        <div className="flex justify-center items-center h-20 gap-4">
          <UserSelector
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <ClaimButton selectedUser={selectedUser} />
        </div>
        <Leaderboard />
      </div>
    </div>
  );
};

export default App;