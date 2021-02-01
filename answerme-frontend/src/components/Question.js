import React, { useRef, useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { ChevronLeftIcon } from "@chakra-ui/icons"
import { useForm } from "react-hook-form";
import axios from "axios"

import { Tooltip, Input, Button, useToast, Spinner } from "@chakra-ui/react"

import API from '../api';

import config from "../config"

function Question() {

    let { id } = useParams();
    let question = {}


    const { register, handleSubmit } = useForm();

    const toast = useToast()

    const myForm = useRef()

    const [data, setData] = useState([])

    async function getQuestions() {
        API.get('/getquestions')
            .then(function (response) {
                setData(response.data)
            })
            .catch(function (err) {
                console.log(err)
            })
    }
    useEffect(() => {
        getQuestions()
    }, [])

    function ReplyComponent(props) {
        return (
            <div className="reply-container rounded-md shadow-md m-3 text-center ring-gray-200 ring-1">
                <br/>
                <p className="font-bold font-mono text-lg lg:text-xl text-black-900 mb-3">{props.username}'s Answer</p>
                <p className="font-bold font-mono text-lg lg:text-xl text-gray-700 mt-3">"{props.reply}"</p>
                <br/>
            </div>
        )
    }

    data.forEach((item, index) => {
        if (parseInt(item._id) === parseInt(id)) {
            question = item
        }
    })
    
    const onSubmit = data => {
        myForm.current.reset()
        API.put(`/addreply/${id}`, data)
            .then(function (response) {
                toast({
                    title: "Answer Added",
                    description: `Your Answer was Added to ${question.username}'s Question. Thank you for helping out!`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                getQuestions()
            })
            .catch(function (err) {
                toast({
                    title: "Uh Oh!",
                    description: "Something went wrong! Try again later. If the problem persists please contact our team.",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                })
            })
    }

    if (parseInt(question._id) === parseInt(id)) {
        return (
            <div className="question-container">
                <div className="header-container">
                    <Tooltip label="Return to home" aria-label="A tooltip">
                        <a href={config.siteURL}>
                            <ChevronLeftIcon className="cursor-pointer" w={16} h={16} />
                        </a>
                    </Tooltip>
                </div>
                <div className="title-container">
                    <p className="font-bold font-mono text-4xl lg:text-5xl text-black-900 mt-2 text-center">{question.title}</p>
                    <p className="font-bold font-mono text-base lg:text-lg text-gray-400 mb-4 mt-1 text-center">Asked by {question.username}</p>
                </div>
                <div className="img-container">
                    <center>
                        <img width="500" src={question.thumbnail} alt={`${question.title} Thumbnail`} />
                    </center>
                </div>
                <hr className="m-4" />
                <div className="content-container">
                    <p className="font-bold font-mono text-lg lg:text-xl text-black-900 mb-2 mt-5 text-center"><span className="text-gray-400">{question.username}'s question: </span>{question.content}</p>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="answers-container mt-10">
                    <p className="font-bold font-mono text-2xl lg:text-3xl text-black-900 mb-4 mt-1 text-center">Leave an Answer</p>
                </div>
                <div className="reply-form m-5">
                    <form onSubmit={handleSubmit(onSubmit)} ref={myForm}>
                        <div className="username-input mb-3">
                            <p className="font-bold font-mono text-lg lg:text-xl text-black-900 mb-2 mt-1">Your Username</p>
                            <Input name="username" placeholder="Your Username" size="md" ref={register({ required: true })} />
                        </div>
                        <div className="answer-input mb-5">
                            <p className="font-bold font-mono text-lg lg:text-xl text-black-900 mb-2 mt-1">Your Answer</p>
                            <Input name="reply" placeholder="Your Answer" size="md" ref={register({ required: true })} />
                        </div>
                        <div className="btn-container text-center">
                            <Button type="submit" variant="outline" colorScheme="blue">Post Answer</Button>
                        </div>
                    </form>
                </div>
                <hr className="m-4" />
                <div className="replies-container">
                    <p className="font-bold font-mono text-2xl lg:text-3xl text-black-900 mb-4 mt-1 text-center">Answers</p>
                    {question.replies.map(reply => {
                        return (
                            <ReplyComponent id={reply.id} key={Math.floor(Math.random() * 1000000) + 1} username={reply.username} reply={reply.reply} />
                        )
                    })}
                    {question.replies.length > 0 ? <br /> : <p className="font-bold font-mono text-xl lg:text-2xl text-black-900 mb-4 mt-1 text-center">No Answer here!</p>}
                </div>
            </div>
        )
    } else {
        return (
            <div className="loader-container mt-20 text-center">
                <Spinner size="xl" />
            </div>
        )
    }
}

export default Question
