
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { getClaimHistory } from "../services/api";

interface Claim {
    user: {
        name: string;
    };
    id: string;
    claimedPoints: number;
    timestamp: Date;
}

const ClaimHistory = () => {

    const [claimHistory, setclaimHistory] = useState([] as Claim[]);

    const loadClaimHistory = async () => {

        try {
            const res = await getClaimHistory();
            if (!res.data) {
                throw new Error("No data found");
            }
            setclaimHistory(res.data.claimHistory);
        } catch (error) {
            console.error("Error loading claim history", error);
            alert('something went wrong!')
        }
    }

    useEffect(() => {

        loadClaimHistory();
       
    }, [])


    return (
        <>
            <Dialog>
                <DialogTrigger className="bg-black absolute top-5 right-32 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn px-4 py-2 rounded-md text-center overflow-hidden">
                    Claim History
                </DialogTrigger>
                <DialogContent className="w-full max-h-[80%] overflow-y-auto">
                    <DialogTitle>Claim History</DialogTitle>

                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claimed By</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claimed Points</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claimed At</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">


                            {claimHistory && claimHistory.slice().reverse().map((claim, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{claim.user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{claim.claimedPoints}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{JSON.stringify(getConvertedDate(claim.timestamp))}</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </DialogContent>
            </Dialog>
        </>
    )
}

const getConvertedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
}

export default ClaimHistory