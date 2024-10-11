import { useEffect } from "react";
import { Button, Container, Navbar } from "react-bootstrap"
import { Outlet, useNavigate } from "react-router-dom"
import useLocalStorage from "use-local-storage";
import DateTime from "./DateTime";

export default function UserBar() {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate]);


    const handleLogout = () => {
        setAuthToken(""); //Clear token from localStorage
    };
    return (
        <>
            <Container className="mt-2">
                <Navbar bg="light" variant="light" className="p-3 rounded">
                    <div>
                        <DateTime />
                    </div>
                    <Navbar.Collapse className="justify-content-end">
                        <Button className="text-white bg-dark rounded" style={{ marginRight: '15px', outline: 'none' }} onClick={handleLogout}>
                            Logout
                        </Button>
                    </Navbar.Collapse>
                </Navbar>
                <Outlet />
            </Container>
        </>

    )
}