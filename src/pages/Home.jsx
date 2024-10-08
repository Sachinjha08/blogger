import React, { useState, useEffect } from 'react';
import { get, dele, put } from '../API/EndPoints';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await get("/api/v1/blog/get-all-blogs");
                console.log("API Response:", response.data);
                if (Array.isArray(response.data)) {
                    setBlogs(response.data);
                } else if (Array.isArray(response.data.blogs)) { 
                    setBlogs(response.data.blogs);
                } else {
                    console.error("Unexpected data structure:", response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="blogs-container">
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div className="blog-card" key={blog.id}>
                        <img src={blog.img} alt={blog.title} className="blog-img" />
                        <div className="blog-content">
                            <h2 className="blog-title">{blog.title}</h2>
                            <p className="blog-description">{blog.dsc}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No blogs available.</p>
            )}
        </div>
    );
};

export default Home;
