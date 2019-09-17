import React from 'react'

const PostImage = ({upload}) => {
    return (
        <div>
            <img className="post-img" src={require(`../../../public/posts/${upload}`)} alt="No image"/>
        </div>
    )
}


export default PostImage
