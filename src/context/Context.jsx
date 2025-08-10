import { createContext, useState } from "react";
import runChat from "../config/gemini"

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const delayPara=(index,nextWord)=>{
        setTimeout(function() {
            setResultData(prev=>prev+nextWord)
        },75*index);
    }

    const onSent = async () => {
        try {
            setResultData(""); // Clear previous result
            setLoading(true);
            setShowResult(true);
            setRecentPrompt(input);
            setPrevPrompts(prev=>[...prev,input])
            const response = await runChat(input);
            let responseArray = response.split("**");
            let newResponse = "";  // Initialize with empty string
            
            // Enhanced formatting for better structure
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<strong>" + responseArray[i] + "</strong>";
                }
            }
            
            // Enhanced formatting with better structure and code blocks
            let formattedResponse = newResponse
                .split("\n").join("<br/>")
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                .replace(/\*(.*?)\*/g, "<em>$1</em>")
                .replace(/###\s(.*?)(<br\/>|$)/g, "<h3>$1</h3>")
                .replace(/##\s(.*?)(<br\/>|$)/g, "<h2>$1</h2>")
                .replace(/#\s(.*?)(<br\/>|$)/g, "<h1>$1</h1>");

            // // Enhanced code block formatting
            // formattedResponse = formattedResponse.replace(
            //     /```(\w+)?\s*<br\/>([\s\S]*?)```/g,
            //     (match, language, code) => {
            //         const lang = language || 'text';
            //         const cleanCode = code.replace(/<br\/>/g, '\n').trim();
            //         const codeId = 'code-' + Math.random().toString(36).substr(2, 9);
            //         return `
            //             <div class="code-block">
            //                 <div class="code-block-header">
            //                     <span class="code-block-language">${lang}</span>
            //                     <button class="copy-button" onclick="copyCode('${codeId}')">
            //                         📋 Copy
            //                     </button>
            //                 </div>
            //                 <pre><code id="${codeId}">${cleanCode}</code></pre>
            //             </div>
            //         `;
            //     }
            // );

            // // Handle inline code
            // formattedResponse = formattedResponse.replace(/`([^`]+)`/g, "<code>$1</code>");
            let newResponseArray=formattedResponse.split(" ");
            for (let i=0;i<newResponseArray.length;i++){
                const nextWord=newResponseArray[i];
                delayPara(i,nextWord+" ")
            }
            setInput("");
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    const newChat = () => {
        setShowResult(false);
        setResultData("");
        setRecentPrompt("");
        setInput("");
    }

    const contextValue = {
        input,
        setInput,
        loading,
        resultData,
        showResult,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        onSent,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider