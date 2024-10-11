import { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NewPostModal from '../components/NewPostModal';

export default function AddBooking() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Container className="mt-3">
                <h2>Book a Room</h2>
                <Navbar className="p-3 bg-light rounded">
                    <Nav className="me-auto">
                        <Nav.Link className="text-white bg-dark p-2 rounded" onClick={handleShow}>
                            Choose Room
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="/profile" className="text-white bg-dark p-2 rounded">
                            Back to Profile
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <NewPostModal show={show} handleClose={handleClose} />
            </Container>
        </>
    )
}