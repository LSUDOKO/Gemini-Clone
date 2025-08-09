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
            setLoading(true);
            setShowResult(true);
            setRecentPrompt(input);
            setPrevPrompts(prev=>[...prev,input])
            const response = await runChat(input);
            let responseArray = response.split("**");
            let newResponse = "";  // Initialize with empty string
            
            // Process bold text and line breaks
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += "<b>"+"<b>" + responseArray[i] + "</b>"+"</b>";
                }
            }
            
            // Replace line breaks
            let formattedResponse = newResponse.split("\n").join("<br/>");
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

    const contextValue = {
        input,
        setInput,
        loading,
        resultData,
        showResult,
        recentPrompt,
        prevPrompts,
        setPrevPrompts,
        onSent
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider