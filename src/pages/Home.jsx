import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import RoomsList from "./RoomList";

export default function Home() {

    return (
        <>
            <Container className="mt-3">
                <h2 >List of Booking</h2>
                <Navbar className="p-3 bg-light rounded">
                    <Nav className="me-auto p-2 border rounded bg-dark text-white">
                        <Nav.Link href="/profile" className="text-white">Your Profile</Nav.Link>
                    </Nav>
                </Navbar>
            </Container>
            <Container>
                <Row>
                    <Col>
                        <RoomsList />
                    </Col>
                </Row>
            </Container>
        </>


    );
}