import { createContext, useState, useEffect } from "react";
export const Context = createContext();

const ContextProvider = (props) => {
  const [chatHistory, setChatHistory] = useState([
    {}
  ]);
  const [allChatHistory, setAllChatHistory] = useState([]);

  const newChat = () => {
    if(chatHistory.length > 1){
      saveChatHistory();
    }
  };

  const saveChatHistory = () => {
      const newChatToStore = {
        date: new Date().toLocaleDateString(),
        sessionChatHistory: [chatHistory],
      };
      console.log(newChatToStore);
      setAllChatHistory((prevHistories) => [...prevHistories, newChatToStore]);
      setChatHistory([{}]);
  };

  useEffect(() => {
    console.log("Updated allChatHistory:", allChatHistory);
  }, [allChatHistory]);

  const contextValue = {
    chatHistory,
    setChatHistory,
    allChatHistory,
    setAllChatHistory,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
