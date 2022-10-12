import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const history = useNavigate()
    const [posts, setPosts] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)
    const [loading, setLoading] = useState(false)

   
    const handleFetchPosts = (e) => {
        e.preventDefault();
        setLoading(true)
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setDataLoaded(true)
                setPosts(posts.concat(data))
                console.log("posts:", posts)
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log("Error occured:", error)
            })

    }
    
    const handleGetPost = (id) => {
        console.log("handleGetPost called:", id)
        history(`/post/${id}`)
    }

    const handleAddpost = (e) => {
        e.preventDefault();
        console.log("handleAddpost function called")
        let title = document.querySelector("#post").value
        let data = {title: title}
        setPosts([data, ...posts])
        
        console.log("new data:", posts)
    }

    return (
        <section className='mt-4'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center m-2">
                        {
                            loading ? (
                                <button class="btn btn-primary" disabled>
                                  <span class="spinner-border spinner-border-sm mr-2"></span>
                                  Loading..
                                </button>
                            ) : (
                                <button type="button" disabled={dataLoaded} onClick={handleFetchPosts} className="btn btn-primary" title="Click here to fetch all posts">Fetch</button>
                            )
                        }
                    </div>
                    <div className="col-md-12 text-center mt-2 mb-4">
                        <input type="text" placeholder='Enter title for your post..' name="post" id="post" />
                        <button type="button" onClick={handleAddpost} className="btn btn-primary">Add New Post</button>
                    </div>
                </div>

                {/* table for posts */}
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-hover">
                            {
                                posts.length > 0 ? (
                                    <thead>
                                        <tr>
                                            <th>Sequence</th>
                                            <th>Post Title</th>
                                        </tr>
                                    </thead>
                                ) : ""
                            }
                            <tbody>
                            {
                                posts.length > 0 ? (
                                    posts.map((item, i) => {
                                        return (
                                            <tr key={item.id} 
                                                    onClick={item.id != null ? () => handleGetPost(item.id) : ""} 
                                                    style={item.id != null ? {cursor: "pointer"} : {cursor: "default"}}>
                                                <td>{i+1}</td>
                                                <td>{item.title}</td>
                                            </tr>
                                        )
                                    })
                                ) : ""
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;