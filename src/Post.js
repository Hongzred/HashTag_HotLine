import React from 'react';

class Post extends React.Component
{
    render()
    {
        return (
            <div className="Post">
                <div className="Post-Author">{this.props.post_author}</div>
                <div className="Post-Location">{this.props.post_location}</div>
                <div className="Post-Content">{this.props.post_content}</div>
            </div>
        );
    }
}

export default Post;
