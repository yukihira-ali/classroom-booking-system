import { Col, Row, Image, Button, Modal, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios';
import useLocalStorage from 'use-local-storage';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const loginImage = "src/assets/classroom.jpeg";
    const url = "https://aac26778-09b5-4ba2-be85-e3870501bd67-00-9ajs0y8jrg5j.pike.replit.dev";

    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/profile");
        }
    }, [authToken, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { username, password });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { username, password });

            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("Login was successful, token saved");
            }
        } catch (error) {
            // Check if the error has a response (meaning the server sent a response with an error status)
            if (error.response) {
                if (error.response.status === 401) {
                    // Unauthorized: likely wrong email or password
                    console.error("Incorrect email or password");
                    alert("Incorrect email or password. Please try again.");
                } else if (error.response.status === 400) {
                    // Bad Request: validation issue or other errors
                    console.error("Invalid request");
                    alert("Invalid request. Please check your input.");
                } else {
                    // Handle other server errors
                    console.error("Server error:", error.response.data);
                    alert("An error occurred. Please try again later.");
                }
            } else {
                // Network or other unknown errors
                console.error("Error:", error.message);
                alert("An error occurred. Please check your connection.");
            }
        }
    };


    const handleClose = () => setModalShow(null);

    return (
        <Row>
            <Col sm={6} className="container-fluid p-0">
                <Image src={loginImage} className="img-fluid portrait-image" />
            </Col>
            <Col sm={6} className="p-4">

                <h2 className='mt-3' style={{ fontSize: 50 }}>Book Your Room</h2>
                <h2 className='mt-3' style={{ fontSize: 35 }}>Resister Student or Staff Account Now</h2>

                <Col sm={5} className='d-grid gap-2'>
                    <Button className='rounded-pill' variant='outline-dark'>
                        <i className='bi bi-google'></i>Sign up with Google
                    </Button>

                    <Button className='rounded-pill' variant='outline-dark'>
                        <i className='bi bi-apple'></i>Sign up with Apple
                    </Button>

                    <p style={{ textAlign: 'center' }}>or</p>

                    <Button className='rounded-pill' onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p style={{ fontSize: '12px' }}>
                        By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use
                    </p>
                    <p className='mt-5' style={{ fontWeight: 'bold' }}>
                        Already have an account?
                    </p>
                    <Button
                        className='rounded-pill'
                        variant="outline-primary"
                        onClick={handleShowLogin}
                    >
                        Sign in
                    </Button>
                </Col>
                <Modal
                    show={modalShow}
                    onHide={handleClose}
                    animation={false}
                    centered
                >
                    <Modal.Body>
                        <h2 className='mb-4' style={{ fontWeight: 'bold' }}>
                            {modalShow === "SignUp"
                                ? "Create your account"
                                : "Log in to your account"}
                        </h2>
                        <Form
                            className='d-grid gap-2 px-5'
                            onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                        >

                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Control
                                    onChange={(e) => setUsername(e.target.value)}
                                    type='email'
                                    placeholder='Enter username'
                                />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Control
                                    onChange={(e) => setPassword(e.target.value)}
                                    type='password'
                                    placeholder='Password'
                                />
                            </Form.Group>
                            <p style={{ fontSize: '12px' }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account seceure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                            </p>
                            <Button className='rounded-pill' type='submit'>
                                {modalShow === "SignUp" ? "Sign up" : "Log in"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col >
        </Row >
    )
}