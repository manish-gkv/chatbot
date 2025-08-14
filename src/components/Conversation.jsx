import { useParams } from "react-router-dom"
import { IoSend } from "react-icons/io5";
import { useSubscription, useMutation } from "@apollo/client";
import { MESSAGES } from "../graphql/subscription";
import { SEND_MESSAGE } from "../graphql/mutations";
import { useState, useEffect } from "react";
import { useAccessToken } from "@nhost/react";
import AIResponseShimmer from "./AIResponseShimmer";
import StreamingMarkdown from "./StreamingMarkdown";
import { useLocation, useNavigate } from "react-router-dom";
export default function Conversation() {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [responseId, setResponseId] = useState(localStorage.getItem("responseId") || "");
    console.log(responseId);
    const { conversationId } = useParams();
    const [send_message, {loading:sendingMessage}] = useMutation(SEND_MESSAGE);
    const accessToken = useAccessToken();
    const { data, loading } = useSubscription(MESSAGES, {
        variables: { chat_id: String(conversationId) }
    });
    const chatHistory = data?.messages || [];

    const sendButtonHandler = async () => {
        if (sendingMessage) return;
        const { data } = await send_message({
            variables: {
                chat_id: String(conversationId),
                content: String(message).trim(),
                role: "user",
                accessToken: accessToken
            }
        });
        setMessage("");
        setResponseId(data.send_message.id);
    };
    useEffect(() => {
        const sendAutoMessage = async () => {
            if (location.state?.autoMessage) {
                const { data } = await send_message({ variables: {
                    chat_id: String(conversationId),
                    content: String(location.state.autoMessage).trim(),
                    role: "user",
                    accessToken: accessToken
                } });
                localStorage.setItem("responseId", data.send_message.id);
                navigate(location.pathname, { replace: true, state: {} });
            }
        };
        sendAutoMessage();
    }, [location]);
    return (
        <>
            <div className="relative px-4 h-full pb-4 z-0">
                <div className="flex flex-col mx-auto max-w-2xl w-full h-full overflow-y-scroll scrollbar-hidden pb-35 px-4 gap-8 text-lg">
                    {
                        chatHistory.map((message)=>{
                            return(
                                <div className={`flex w-full justify-${message.role==='user'?"end ":"start"}`}
                                    key={message.id}
                                >
                                    <div className={`w-fit max-w-full ${message.role==='user'?"bg-gray-200 py-1 px-4 rounded-full":""}`}>
                                        {message.role === "user" ? (message.content) : (
                                            <StreamingMarkdown text={message.content} stream={responseId===message.id} />
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {sendingMessage && <AIResponseShimmer />}
                </div>
                <div className="absolute inset-x-4 bottom-0 bg-white ">
                    <div className="flex p-4 mx-auto max-w-2xl w-full overflow-hidden">
                        <div className="flex flex-col px-4 py-2 w-2xl h-fit bg-white border border-gray-500 rounded-3xl shadow-lg shadow-gray-300">
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
                            <div className="flex justify-end disabled:opacity-50 disabled:cursor-not-allowed" onClick={sendButtonHandler}
                                disabled={loading}>
                                <IoSend className="text-2xl cursor-pointer hover:text-gray-800 " />
                            </div>
                        </div>

                    </div>
                    <div className="flex mx-auto max-w-2xl w-full overflow-hidden text-xs justify-center">
                        <p className="text-center text-gray-500 tracking-tighter">ChatBot can make mistakes.</p>
                    </div>
                </div>
            </div>
        </>
    )
}