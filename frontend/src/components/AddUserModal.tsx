
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalTrigger,
} from "./ui/animated-modal";

import AddUser from "./AddUser";


const AddUserModal = ({ reloadUsers }: {
    reloadUsers: () => void;
}) => {
   
    return (
        <>
            <Modal>
                <ModalTrigger className="bg-black absolute top-5 right-5 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
                    Add User
                </ModalTrigger>
                <ModalBody className="w-4">
                    <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                            Add new user
                        </h4>
                        <div className="flex justify-center items-center">
                            <AddUser reloadUsers={reloadUsers} />
                        </div>
                        
                    </ModalContent >
                </ModalBody>
            </Modal>
        </>
    )
}

export default AddUserModal