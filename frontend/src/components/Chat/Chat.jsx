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

export default function Chat() {
    const [messages, setMessages] = useState([  // State for messages
        {
            type: 'text',
            direction: 'incoming',
            message: "Hello! I'm ChatGPT 4. How can I help you today?",
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

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
            const response = await fetch(`http://127.0.0.1:8000/chat/?input=${userMessage}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const htmlContent = data || "Sorry, I couldn't understand that.";

            // Add bot's response to the chat
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    type: 'html',
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
        <MainContainer>
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
                />
            </ChatContainer>
        </MainContainer>
    );
}
