import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import { io } from "socket.io-client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"


interface User {
    id: string;
    name: string;
    totalPoints: number;
}

const socket = io("http://localhost:5000");

const Leaderboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    const loadLeaderboard = async () => {
        try {
            const response = await fetchUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error loading leaderboard", error);
            alert('something went wrong!')
        }
    };

    useEffect(() => {
        loadLeaderboard();

        socket.on("update", loadLeaderboard);

        return () => {
            socket.off("leaderboardUpdated");
        };
    }, []);

    return (
        <div className="mt-8 w-full flex items-center justify-center flex-col border">
            <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
            <div className="bg-white w-fit flex justify-center shadow-md rounded-lg overflow-hidden">

                <Table className="w-64">
                    
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Rank</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Points</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.totalPoints}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Leaderboard;