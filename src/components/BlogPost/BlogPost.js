import React from 'react';
import './BlogPost.css';

function BlogPost(props) {
  const { title, content, imageUrl } = props;
  return (
    <div className="blog-post">
      <img src={imageUrl} alt="" className="blog-post__image" />
      <h2 className="blog-post__title">{title}</h2>
      <div className="blog-post__content">{content}</div>
    </div>
  );
}

export default BlogPost;
