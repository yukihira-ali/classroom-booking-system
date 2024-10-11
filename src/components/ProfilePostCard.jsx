import { Button, Col } from "react-bootstrap"


export default function ProfilePostCard({ content, title, author, timeout, onDelete, onEdit }) {
    return (
        <Col>
            <h5>{content}</h5>
            <p>{title}</p>
            <p>{author}</p>
            <p>{timeout}</p>
            <Button variant="outline-primary" onClick={onEdit}>Edit</Button>
            <Button variant="danger" onClick={onDelete}>Delete</Button>
        </Col>
    )
}