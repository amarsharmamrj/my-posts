import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Post = () => {
    const params = useParams();
    const history = useNavigate()

    const [post, setPost] = useState({})
    const [dataLoaded, setDataLoaded] = useState(false)

    const handleFetchPostBody = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                setPost(data)
                setDataLoaded(true)
            })
            .catch((error) => {
                console.log("Error occured:", error)
            })

    }
    const handleHome  = () => {
        history("/")
    }
    useEffect(() => {
        handleFetchPostBody(params.id);
    }, [params.id])
    return (
        <div className="container mt-4">
             <div className="row">
                    <div className="col-md-12 text-center mt-2">
                        <button type="button" onClick={handleHome} className="btn btn-primary" title="Click here to fetch all posts">Back to Home</button>
                    </div>
                    <div className="col-md-12 text-center mt-4">  
                        {
                            dataLoaded ? (
                                <div className="card">
                                    <div className="header">
                                        <h1>{post.title}</h1>
                                    </div>
                                    <div className="body">
                                        <p>{post.body}</p>
                                    </div>
                                </div>  
                            ) : (
                                <button class="btn" style={{fontSize: "25px"}} disabled>
                                    <span class="spinner-border spinner-border-sm mr-2"></span>
                                    Loading..
                                </button>
                            )
                        }
                    </div>
                </div>
        </div>
    )
}
export default Post;