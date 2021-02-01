import React from 'react'
import logo from "../assets/logo.png"

function Header() {
    return (
        <div className="header">
            <div className="flex items-center m-3">
                <div>
                    <img className="w-16 h-16 lg:w-20 lg:h-20" src={logo} alt="AnswerMe Logo" />
                </div>
                <div>
                    <p className="ml-3 font-bold font-mono text-4xl lg:text-5xl text-black-900 hover:text-blue-600 cursor-pointer transition-all">AnswerMe</p>
                </div>
            </div>
            <hr className="text-gray-500 m-3" />
        </div>

    )
}

export default Header
