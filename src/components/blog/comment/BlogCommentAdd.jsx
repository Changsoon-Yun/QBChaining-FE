import React from "react";
import { useDispatch } from "react-redux";
// import styled from "styled-components";
import { postBlogCommentDB } from "../../../redux/async/blog.js";
import { useParams } from "react-router-dom";
const CommentAdd = () => {
  const dispatch = useDispatch();
  const commentRefInput = React.useRef();
  const { id } = useParams();
  //댓글 추가 이벤트

  const addComment = () => {
    console.log(id);
    dispatch(
      postBlogCommentDB({
        comment: commentRefInput.current.value,
        id,
      }),
    );
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addComment();
      }}
    >
      <input
        type="text"
        ref={commentRefInput}
        placeholder={"20자이하"}
        maxLength="20"
      />

      <button
        onClick={() => {
          addComment();
        }}
      >
        추가하기
      </button>
    </form>
  );
};

export default CommentAdd;
