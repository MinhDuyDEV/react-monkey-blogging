import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-content {
      flex: 1;
    }
    &-category {
      margin-bottom: 8px;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    margin-bottom: 14px;
    padding-bottom: 14px;
    .post {
      &-image {
        width: 140px;
        height: 100px;
      }
    }
  }
`;
const PostNewestItem = () => {
  return (
    <PostNewestItemStyles>
      <PostImage
        url="https://images.unsplash.com/photo-1590212151175-e58edd96185b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
        alt="unsplash"
      ></PostImage>
      <div className="post-content">
        <PostCategory type="secondary">Knowledge</PostCategory>
        <PostTitle size="small">
          The complete guide to learn new languages for beginners
        </PostTitle>
        <PostMeta color="secondary"></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
