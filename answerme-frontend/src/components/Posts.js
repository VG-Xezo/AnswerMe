import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"

import API from '../api';

function Posts() {

    const [questions, setQuestions] = useState([])


    useEffect(() => {
        async function getQuestions() {
            API.get('/getquestions')
                .then(function (response) {
                    setQuestions(response.data)
                })
                .catch(function (err) {
                    console.log(err)
                }) 
        }
        getQuestions()
    }, [])


    return (
        <div className="posts-container mb-4">
            <p className="font-bold text-center font-mono text-4xl lg:text-5xl text-black-900">Questions</p>
            <hr className="m-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mr-1 ml-1">
                {questions.map(post => {
                    return (
                        <Link key={post._id} to={`/question/${post._id}`}>
                            <div className="rounded-md cursor-pointer hover:shadow-2xl transition-all ring-gray-200 ring-1">
                                <div className="img-container hidden md:block">
                                    <img width="600" height="600" src={post.thumbnail} alt={`${post.title} Thumbnail`} />
                                </div>
                                <div className="title-container mt-2 rounded-md">
                                    <p className="text-center font-mono text-base lg:text-xl text-black-900">{post.title}</p>
                                </div>
                                <hr className="m-2" />
                                <div className="content-container mb-3">
                                    <p className="text-center font-mono text-sm lg:text-base text-gray-500">{post.content}</p>
                                </div>
                                <div className="catergory-container bg-blue-600 rounded-full px-4 py-1 ml-4 mr-4">
                                    <p className="text-center font-mono text-base lg:text-xl text-white">{`#${post.catergory}`}</p>
                                </div>
                                <div className="replies-container mt-2">
                                    <p className="text-center font-mono text-sm lg:text-base text-gray-400">{`View ${post.replies.length} replies...`}</p>
                                </div>
                            </div>
                        </Link>
                        )
                    })}
            </div>
        </div>
    )
}

export default Posts
