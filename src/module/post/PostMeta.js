import React from "react";
import styled, { css } from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  ${(props) =>
    props.color === "secondary" &&
    css`
      color: ${(props) => props.theme.gray6B};
    `};
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
    gap: 6px;
  }
`;

const PostMeta = ({
  date = "Mar 23",
  authorName = "Andiez Le",
  children,
  className = "",
  color,
}) => {
  return (
    <PostMetaStyles className={`post-meta ${className}`} color={color}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{authorName}</span>
      {children}
    </PostMetaStyles>
  );
};

export default PostMeta;
