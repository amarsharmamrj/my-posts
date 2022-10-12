import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Post from './components/post';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<Post />} />
                {/* <Route path="/posts" element={<Home />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;