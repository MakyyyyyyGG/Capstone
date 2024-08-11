import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const CreateRoom = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [roomName, setRoomName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [roomCode, setRoomCode] = useState("");

  // Function to generate a unique 4-digit room code
  const generateRoomCode = async () => {
    let code;
    let unique = false;

    while (!unique) {
      code = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number

      // Check if the code already exists
      const response = await fetch(
        `/api/accounts_teacher/room/check-room-code?code=${code}`
      );
      const result = await response.json();
      unique = !result.exists; // Check if the code already exists
    }

    return code;
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    console.log("Create Room");
    console.log(roomName, difficulty);

    // Generate a unique room code
    const generatedRoomCode = await generateRoomCode();
    setRoomCode(generatedRoomCode);

    const roomData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_id: session.user.id, // Assuming session has user ID
        room_name: roomName,
        difficulty: difficulty,
        room_code: generatedRoomCode,
      }),
    };

    try {
      const response = await fetch(
        "/api/accounts_teacher/room/create_room",
        roomData
      );
      const result = await response.json();
      console.log(result);
      console.log("Room created successfully");
    } catch (error) {
      console.error("Error creating room:", error);
    }

    setDifficulty("");
    onOpenChange(false);
  };

  const handleDifficultyChange = (key) => {
    setDifficulty(key);
  };

  return (
    <div>
      <Button onPress={onOpen} color="secondary">
        Create Room
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Room
              </ModalHeader>

              <ModalBody>
                <form action="">
                  <Input
                    placeholder="Room Name"
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                  <Dropdown>
                    <DropdownTrigger>
                      {(difficulty && (
                        <Button variant="bordered">{difficulty}</Button>
                      )) || (
                        <Button variant="bordered">Choose Difficulty</Button>
                      )}
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Static Actions"
                      onAction={handleDifficultyChange}
                    >
                      <DropdownItem
                        key="Easy"
                        color="success"
                        className="text-success"
                      >
                        Easy
                      </DropdownItem>
                      <DropdownItem
                        key="Moderate"
                        color="warning"
                        className="text-warning"
                      >
                        Moderate
                      </DropdownItem>
                      <DropdownItem
                        key="Hard"
                        color="danger"
                        className="text-danger"
                      >
                        Hard
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onClick={handleCreateRoom}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateRoom;
