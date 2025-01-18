import { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import { io } from "socket.io-client";

interface User {
    id: string;
    name: string;
    totalPoints: number;
}

interface Props {
    selectedUser: string;
    setSelectedUser: (id: string) => void;
}

const socket = io(import.meta.env.VITE_API_BASE_URL as string);

const UserSelector = ({ selectedUser, setSelectedUser }: Props) => {
    const [users, setUsers] = useState<User[]>([]);

    const loadUsers = async () => {
        const response = await fetchUsers();
        setUsers(response.data);
    };

    useEffect(() => {
        loadUsers();

        socket.on("updateTheData", () => {
            loadUsers();
        });

        return () => {
            socket.off("userAdded");
        }
    }, []); // Reload when trigger changes

    return (
        <div className="flex flex-col items-center space-y-4">
            <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option value="">Select a user</option>
                {Array.isArray(users) && users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserSelector;
