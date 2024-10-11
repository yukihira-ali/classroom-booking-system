import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function NewPostForm() {
    const [postContent, setPostContent] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [timeout, setTimeout] = useState("");

    const handleSave = (e) => {
        e.preventDefault(); // Prevent form submission from refreshing the page
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            title: title,
            content: postContent,
            author: author,
            timeout: timeout,
            user_id: userId,
        };

        axios
            .post("https://aac26778-09b5-4ba2-be85-e3870501bd67-00-9ajs0y8jrg5j.pike.replit.dev/posts", data)
            .then((response) => {
                console.log("Success:", response.data);
                setPostContent(""); // Clear the content after saving
                setTitle(""); // Clear the title after saving
                setAuthor("");
                setTimeout("");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <Form onSubmit={handleSave}>
            <Form.Group controlId="classRoom">
                <Form.Label>Class Room</Form.Label>
                <Form.Control
                    as="select"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)} // Update room type state
                >
                    <option value="">Select Classroom</option>
                    <option>Classroom A | Level 1 | 20 Pax</option>
                    <option>Classroom A | Level 1 | 20 Pax</option>
                    <option>Meeting room A | Level 2 | 5 Pax</option>
                    <option>Meeting room B | Level 2 | 2 Pax</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="selectDate">
                <Form.Label>Select Date</Form.Label>
                <Form.Control
                    type="date" // Use type="date" for a date picker
                    value={title} // Bind to selectedDate state
                    onChange={(e) => setTitle(e.target.value)} // Update state with the selected date
                />
            </Form.Group>
            <Form.Group controlId="selectTime">
                <Form.Label>Select Time In</Form.Label>
                <Form.Control
                    type="time" // Change type to "time" for a time picker
                    value={author} // Bind to selectedTime state (update variable name accordingly)
                    onChange={(e) => setAuthor(e.target.value)} // Update state with the selected time
                />
            </Form.Group>
            <Form.Group controlId="selectTimeOut">
                <Form.Label>Select Time Out</Form.Label>
                <Form.Control
                    type="time" // Change type to "time" for a time picker
                    value={timeout} // Bind to selectedTime state (update variable name accordingly)
                    onChange={(e) => setTimeout(e.target.value)} // Update state with the selected time
                />
            </Form.Group>
            <Button
                variant="primary"
                className="rounded-pill"
                type="submit"
            >
                Confirm Booking
            </Button>
        </Form>
    );
}
