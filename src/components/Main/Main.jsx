import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    
    const handleCardClick = (cardText) => {
        setInput(cardText);
    }

    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className='main-container'>
                {!showResult ? <>
                    <div className='greeting'>
                        <p><span>Hello, Arpit</span></p>
                        <p>How can I help you today?</p>
                    </div>
                    <div className="cards">
                        <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
                            <p>Suggest beutiful places to dee on an upcoming road trip </p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card" onClick={() => handleCardClick("Briefly summarise this concept: urban planning")}>
                            <p>Breifly summerise this concept : urban planning</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
                            <p>Brainstrom team bonding activities for our work retreat</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card" onClick={() => handleCardClick("Improve the readability of following code")}>
                            <p>Improve the readablility of following code</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                    </div>
                </>
                : <div className='result'>
                    {/* User Question Section */}
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    
                    {/* Assistant Response Section */}
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        <div className="content">
                            {loading ?
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <div dangerouslySetInnerHTML={{__html: resultData}}></div>
                            }
                        </div>
                    </div>
                </div>
                }
                
                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={() => onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main