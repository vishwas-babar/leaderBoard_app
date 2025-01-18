import { useState } from "react";
import { addUser } from "../services/api";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL as string);
const AddUser = ({ reloadUsers }: { reloadUsers: () => void }) => {
    const [newUserName, setNewUserName] = useState("");

    const handleAddUser = async () => {

        if (!newUserName.trim()) {
            alert("Please enter a valid name.");
        } 

        try {
            await addUser(newUserName);
            setNewUserName("");
            alert("User added!");
            reloadUsers(); // Refresh the user list after adding a new user
            socket.emit("userAdded");
        } catch (error) {
            console.error("Error adding user", error);
            alert('something went wrong!')
        }
    };

    

    return (
        <div className="flex flex-col items-center space-y-4">
            <input
                type="text"
                value={newUserName}
                placeholder="Enter new user name"
                onChange={(e) => setNewUserName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            />
            <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Add User
            </button>
        </div>
    );
};

export default AddUser;