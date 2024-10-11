import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Form, Modal } from 'react-bootstrap';
import ProfilePostCard from './ProfilePostCard';

export default function ProfileMidBody({ handleLogout }) {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null);
    const [editData, setEditData] = useState({ title: '', content: '', author: '', timeout: '' });
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchPosts = (userId) => {
        fetch(`https://aac26778-09b5-4ba2-be85-e3870501bd67-00-9ajs0y8jrg5j.pike.replit.dev/posts/user/${userId}`)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error:", error));
    };

    const deletePost = (postId) => {
        fetch(`https://aac26778-09b5-4ba2-be85-e3870501bd67-00-9ajs0y8jrg5j.pike.replit.dev/posts/${postId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
            })
            .catch((error) => console.error("Error:", error));
    };

    const handleEdit = (post) => {
        setEditPost(post);
        setEditData({ title: post.title, content: post.content, author: post.author, timeout: post.timeout });
        setShowEditModal(true);
    };

    const handleUpdatePost = (e) => {
        e.preventDefault();
        fetch(`https://aac26778-09b5-4ba2-be85-e3870501bd67-00-9ajs0y8jrg5j.pike.replit.dev/posts/${editPost.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData),
        })
            .then((response) => response.json())
            .then(() => {
                setPosts((prevPosts) => prevPosts.map((post) => (post.id === editPost.id ? { ...post, ...editData } : post)));
                setShowEditModal(false);
                setEditPost(null);
            })
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchPosts(userId);
        }
    }, []);

    return (
        <>
            <Col>
                <Container className='mt-2'>
                    <Col className='bg-light p-1 rounded' style={{ border: "1px solid lightgray" }}>
                        <div className="mt-5" style={{ paddingLeft: "100px" }}>
                            <p style={{ fontWeight: "bold", fontSize: "18px" }}>Ali</p>
                            <p style={{ marginBottom: "2px" }}>@Ali_Asnawi</p>
                            <p>I help people to be an instructor at sigmaschool.co</p>
                            <p>Final Year Student</p>
                            <Row className='justify-content-start'>
                                <Col xs="auto">
                                    <Button
                                        className='rounded-pill mt-2'
                                        variant='outline-secondary'
                                        onClick={handleLogout}
                                    >
                                        Edit Profile
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Container>
                <Container>
                    {posts.length > 0 && posts.map((post) => (
                        <ProfilePostCard
                            key={post.id}
                            content={post.content}
                            title={`Date: ${post.title}`}
                            author={`Time In: ${post.author}`}
                            timeout={`Time Out: ${post.timeout}`}
                            onDelete={() => deletePost(post.id)}
                            onEdit={() => handleEdit(post)} // Add edit handler
                        />
                    ))}
                </Container>
            </Col>

            {/* Edit Post Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Your Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdatePost}>
                        <Form.Group controlId="formContent">
                            <Form.Label>Change Room</Form.Label>
                            <Form.Select
                                type="text"
                                value={editData.content}
                                onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                                required
                            >
                                <option value="">Select a title</option>
                                <option>Classroom A | Level 1 | 20 Pax</option>
                                <option>Classroom A | Level 1 | 20 Pax</option>
                                <option>Meeting Room A | Level 2 | 5 Pax</option>
                                <option>Meeting Room B | Level 2 | 2 Pax</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="selectDate">
                            <Form.Label>Change Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={editData.date}
                                onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="selectTime">
                            <Form.Label>Change Time In</Form.Label>
                            <Form.Control
                                type="time"
                                value={editData.timeout}
                                onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="selectTimeout">
                            <Form.Label>Change Time Out</Form.Label>
                            <Form.Control
                                type="time"
                                value={editData.timeout}
                                onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Post
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
