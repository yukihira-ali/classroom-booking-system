import { Container, Nav, Navbar } from "react-bootstrap";
import ProfileMidBody from "../components/ProfileMidBody";



export default function ProfilePage() {


    return (
        <>
            {/* Navbar Section */}
            <Container className="mt-3">
                <h2>Book a Room</h2>
                <Navbar className="p-3 bg-light rounded">
                    <Nav className="me-auto">
                        <Nav.Link href="/add" className="text-white bg-dark p-2 rounded">
                            Add Booking
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="/" className="text-white bg-dark p-2 rounded">
                            View Booking
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </Container>
            <Container>
                <ProfileMidBody />
            </Container>
        </>



    )
}
