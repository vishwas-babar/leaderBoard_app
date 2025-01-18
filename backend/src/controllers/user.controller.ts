import { Request, RequestHandler, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getIo, io } from "../socket"

const prisma = new PrismaClient();

// Claim random points for a user
export const claimPoints: RequestHandler = async (req: Request, res: Response) => {
    const { userId } = req.body;

    if (!userId) {
         res.status(400).json({
            message: "please provide the userId"
         })
        
        return;
    }

    try {
        const randomPoints = Math.floor(Math.random() * 10) + 1;

        // Update user points
        await prisma.user.update({
            where: { id: userId },
            data: { totalPoints: { increment: randomPoints } },
        });

        // Record claim history
        await prisma.claimHistory.create({
            data: {
                userId,
                claimedPoints: randomPoints,
            },
        });

        io.emit("leaderBoardUpdated"); // notifying all the client

        res.status(200).json({ message: "Points claimed!", points: randomPoints });
        return;
    } catch (error) {

        console.log(error)
        res.status(500).json({ error: "Failed to claim points" });
    }
};

// Get leaderboard rankings
export const getAllUsersData = async (_req: Request, res: Response) => {
    try {
        const leaderboard = await prisma.user.findMany({
            orderBy: { totalPoints: "desc" },
        });
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
};

// Add a new user
export const createUser: RequestHandler = async (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
         res.status(400).json({ message: "please provide the name" })
    }

    try {
        const newUser = await prisma.user.create({
            data: { name },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Failed to add user" });
    }
};

// get a claim history
export const getClaimHistory: RequestHandler = async (req: Request, res: Response) => {
    try {
        const claims = await prisma.claimHistory.findMany({
            select: {
                user: {
                    select: {
                        name: true
                    }
                },
                timestamp: true,
                id: true,
                claimedPoints: true
            }
        });

        console.log(claims)

        res.status(200).json({
            claimHistory: claims
        })
    } catch (error) {
        console.log(error)
        res.status(500).json("failed to get claim history")
    }
}
