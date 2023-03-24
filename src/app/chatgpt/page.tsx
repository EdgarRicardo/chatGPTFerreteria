import HelpChatGPT from '../pages/helpChatGPT';
export default function ChatGPT() { 
    const apiKey = process.env.API_KEY_CHATGPT;
    return (
        <HelpChatGPT apiKey={apiKey!}></HelpChatGPT>
    )
}