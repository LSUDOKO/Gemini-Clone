import React, { useContext, useState } from 'react'
import './Sidebar.css' 
import  {assets} from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
   const [extended, setExtended] = useState(false)
   const {onSent, prevPrompts, setRecentPrompt} = useContext(Context)

   const loadPrompt = (prompt) => {
       setRecentPrompt(prompt);
   }t=async (prompt) => {}
  return (
    <div className='sidebar'>
        <div className='top'>
                <img onClick={()=>setExtended(prev=>!prev)} className ='menu' src={assets.menu_icon} alt="" />
                <div className='new-chat' >
                       <img src={assets.plus_icon} alt="" /> 
                       {extended ? <p>New Chat</p> : null} 
                </div>
                {extended && (
                    <div className='recent'>
                        <p className='recent-title'>Recent</p>
                        {prevPrompts.map((prompt, index) => (
                            <div 
                                key={index} 
                                className='recent-entry'
                                onClick={() => loadPrompt(prompt)}
                            >
                                <img src={assets.message_icon} alt="" />
                                <p>{prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}</p>
                            </div>
                        ))}
                    </div>
                )}
                
        </div>
        <div className='bottom'>
                <div className="bottom-items recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended?<p>Help</p> : null}
                </div>
                <div className="bottom-items recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended?<p>Activity</p>:null}
                </div>
                <div className="bottom-items recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended?<p>Settings</p>:null}
                </div>
        </div>
    </div>
  )
}

export default Sidebar