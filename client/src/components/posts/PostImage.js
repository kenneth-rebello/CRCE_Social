import React, { useEffect } from 'react'

const PostImage = ({upload}) => {

    useEffect(() => {
        window.$('.materialboxed').materialbox();
    })

    return (
        <div>
            <img className="post-img materialboxed" src={upload} alt="..."/>
        </div>
    )
}


export default PostImage
