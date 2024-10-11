import { useEffect, useState } from 'react';
import axios from 'axios';

const RoomList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://aac26778-09b5-4ba2-be85-e3870501bd67-00-9ajs0y8jrg5j.pike.replit.dev/posts');
                setPosts(response.data);
            } catch (err) {
                setError('Error fetching posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.content}</h2>
                        <p><strong>Date: </strong>{post.title}</p>
                        <p><strong>Time In: </strong>{post.author}</p>
                        <p><strong>Time Out: </strong> {post.timeout}</p>
                        <p><strong>Student ID: </strong> {post.user_id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;
