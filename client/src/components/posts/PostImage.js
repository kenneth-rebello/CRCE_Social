import React from 'react'

const PostImage = ({upload}) => {
    return (
        <div>
            <img className="post-img" src={upload} alt="..."/>
        </div>
    )
}


export default PostImage
