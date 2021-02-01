import React, { useRef } from 'react'
import axios from "axios"


import { PlusSquareIcon } from '@chakra-ui/icons'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input
} from "@chakra-ui/react"

import API from "../api"

import { useToast } from "@chakra-ui/react"

import { useForm } from "react-hook-form"

function SubmitQuestion() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { register, handleSubmit } = useForm();
    const myForm = useRef()

    const toast = useToast()

    const onSubmit = data => { 
        data.replies = []
        console.log(data)
        myForm.current.reset()
        onClose()
        API.post('/addquestion', data)
            .then(function (response) {
                console.log(response);
                toast({
                    title: "Question Submitted",
                    description: "We've submitted your question",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setTimeout(() => window.location.reload(), 1000)  
            })
            .catch(function (err) {
                console.log(err)
                toast({
                    title: "Uh Oh!",
                    description: "Something went wrong! Try again later. If the problem persists please contact our team.",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                })
            })      
    }

    return (
        <div className="submit-container">
            <div className="flex justify-between m-4">
                <div>
                    <p className="font-bold font-mono text-2xl lg:text-3xl text-black-900 mb-4">Submit a Question</p>
                </div>
                <div>
                    <Button colorScheme="twitter" onClick={onOpen}>Submit Question</Button>
                </div>
            </div>
            <div className="modal-container">
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Your Question</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form ref={myForm} onSubmit={handleSubmit(onSubmit)}>
                                <div className="username-input mb-3">
                                    <p className="font-bold font-mono text-xl lg:text-2xl text-black-900 mb-2">Your Username</p>
                                    <Input name="username" placeholder="Your Username" size="md" ref={register({ required: true })} />
                                </div>
                                <div className="thumbnail-url mb-3">
                                    <p className="font-bold font-mono text-xl lg:text-2xl text-black-900 mb-2">Question Thumbnail URL</p>
                                    <Input name="thumbnail" placeholder="Thumnail URL" size="md" ref={register({ required: true })} />
                                </div>
                                <div className="question-title mb-3">
                                    <p className="font-bold font-mono text-xl lg:text-2xl text-black-900 mb-2">Question Title</p>
                                    <Input name="title" placeholder="Question Title" size="md" ref={register({ required: true })} />
                                </div>
                                <div className="question-content mb-3">
                                    <p className="font-bold font-mono text-xl lg:text-2xl text-black-900 mb-2">Question Content</p>
                                    <Input name="content" placeholder="Question Content" size="md" ref={register({ required: true })} />
                                </div>
                                <div className="question-catergory mb-3">
                                    <p className="font-bold font-mono text-xl lg:text-2xl text-black-900 mb-2">Question Catergory</p>
                                    <Input name="catergory" placeholder="Question Catergory" size="md" ref={register({ required: true })} />
                                </div>
                                <div className="btn-container text-center">
                                    <Button leftIcon={<PlusSquareIcon />} colorScheme="teal" type="submit">Submit</Button>
                                </div>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}

export default SubmitQuestion
