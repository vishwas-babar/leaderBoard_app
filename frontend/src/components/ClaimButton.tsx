
import { claimPoints } from "../services/api";

interface Props {
    selectedUser: string;
}

const ClaimButton = ({ selectedUser }: Props) => {
    const handleClaim = async () => {
        if (!selectedUser) {
            return alert("Please select a user.");  
        } 

        try {
            await claimPoints(selectedUser);
            alert("Points claimed!");
        } catch (error) {
            console.error("Error claiming points", error);
            alert('something went wrong!')
        }
    };

    return (
        <button
            onClick={handleClaim}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
            Claim Points
        </button>
    );
};

export default ClaimButton;