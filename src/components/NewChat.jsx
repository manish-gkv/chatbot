import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useMutation} from '@apollo/client';
import { useAccessToken } from "@nhost/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {CREATE_CHAT, SEND_MESSAGE} from "../graphql/mutations";
export default function NewChat(){
    const [message, setMessage] = useState("");
    const [createChat, { loading:creatingChat, error }] = useMutation(CREATE_CHAT);
    const [sendMessage, {loading:sendingMessage}] = useMutation(SEND_MESSAGE);
    const navigate = useNavigate();
    const accessToken = useAccessToken();
    const sendButtonHandler = async () => {
        if(creatingChat || sendingMessage) return;
        if (!message.trim()) {
            toast.error("Message cannot be empty");
            return;
        }
        const { data } = await createChat({
            variables: {
                name: message.trim().substring(0, 25)
            }
        });
        if (!creatingChat) {
            const { data2 } = await sendMessage({
                variables: {
                    chat_id: data.insert_chats_one.id,
                    content: message.trim(),
                    role: "user",
                    accessToken: accessToken
                }
            });
            console.log("Chat created successfully:", data2);
            setMessage("");
            navigate(`/c/${data.insert_chats_one.id}`);

        }
        if (error) {
            console.log("Failed to create chat:", error);
            toast.error("Failed to create chat", error.message || "");
        }
    };
    return (
        <>
            <div className="h-full">
                <div className="flex flex-col h-full p-10 gap-4 items-center justify-center">
                    <div className="flex text-xl sm:text-2xl font-semibold tracking-tighter justify-center ">What's on your mind today?</div>
                    <div className="flex p-4 mx-auto max-w-2xl w-full overflow-hidden">
                        <div className="flex flex-col px-4 py-2 w-2xl h-fit border border-gray-500 rounded-3xl shadow-lg shadow-gray-300">
                            <textarea
                                placeholder="Type your message here..."
                                className="flex flex-row focus:outline-none w-full resize-none overflow-hidden"
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                rows={1}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button className="flex justify-end" onClick={sendButtonHandler}
                                disabled={creatingChat || sendingMessage}>
                                <IoSend className="text-2xl cursor-pointer hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed" 
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}