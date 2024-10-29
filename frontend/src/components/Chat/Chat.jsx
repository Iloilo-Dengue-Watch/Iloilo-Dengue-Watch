import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ConversationHeader,
    TypingIndicator,
    Avatar,
    MessageList,
    Message,
    MessageInput,
    ChatContainer
} from '@chatscope/chat-ui-kit-react';
import { useState } from 'react';
import { FaRobot, FaUser } from 'react-icons/fa';
import { useEffect } from 'react';
export default function Chat({handleTabChange}) {
    const [messages, setMessages] = useState([  // State for messages
        {
            type: 'text',
            direction: 'incoming',
            message: "Hello! I'm ChatGPT 4. How can I help you today? \n" +
                "I can only provide information about dengue. \n" +
                "Unfortunately, I am still yet to be integrated " +
                "\nwith being able to remember past conversations. " +
                "\nSo each request is treated as a new one.",
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    useEffect(() => {
        handleTabChange("Chat");
    }, [handleTabChange]);
    const handleSend = async (userMessage) => {
        // Add the user's message to the chat
        setMessages(prevMessages => [
            ...prevMessages,
            {
                type: 'text',
                direction: 'outgoing',
                message: userMessage,
            }
        ]);
        setIsTyping(true);

        try {
            const response = await fetch(`https://dengue-watch-backend-f59b9593b035.herokuapp.com/chat/?input=${userMessage}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const htmlContent = data || "Sorry, I couldn't understand that.";

            // Add bot's response to the chat
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    type: 'text',
                    direction: 'incoming',
                    message: htmlContent,
                }
            ]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    type: 'html',
                    direction: 'incoming',
                    message: "Oops! Something went wrong. Please try again.",
                }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-4">
            <div className="mb-4 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Chat With ChatGPT</h1>
                <p className="text-lg text-gray-700">LLMs, like ChatGPT 4, are helpful when seeking information.</p>
                <p className="text-gray-700">Powered by <a href="https://openai.com/blog/openai-api/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI API</a></p>
                <p className="text-gray-700">Note: Use ChatGPT 4 responsibly. They may produce inaccurate results.</p>
            </div>
            <MainContainer className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
                <ChatContainer style={{ height: '500px' }}>
                    <ConversationHeader>
                        <Avatar
                            name="ChatGPT 4"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s"
                        />
                        <ConversationHeader.Content userName="ChatGPT 4" />
                    </ConversationHeader>

                    <MessageList typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing..." /> : null}>
                        {messages.map((msg, index) => (
                            <Message
                                key={index}
                                model={{
                                    type: msg.type,
                                    direction: msg.direction,
                                }}
                            >
                                {msg.direction === 'incoming' && <FaRobot className="text-blue-500 mr-2" />}
                                {msg.direction === 'outgoing' && <FaUser className="text-green-500 mr-2" />}
                                {msg.type === 'text' && (
                                    <Message.TextContent text={msg.message} />
                                )}
                                {msg.type === 'html' && (
                                    <Message.HtmlContent html={msg.message} />
                                )}
                            </Message>
                        ))}
                    </MessageList>

                    <MessageInput
                        placeholder="Type message here"
                        onSend={(input) => handleSend(input)}
                        className="border-t border-gray-200"
                    />
                </ChatContainer>
            </MainContainer>
        </div>
    );
}