import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { postBlogCommentDB } from "../../../redux/async/blog.js";
import { useParams } from "react-router-dom";
import profilecomment from "../../../assets/images/porfilecomment.png";
const CommentAdd = () => {
  const dispatch = useDispatch();
  const commentRefInput = useRef();
  const { id } = useParams();

  //댓글 추가 이벤트
  const addComment = e => {
    e.preventDefault();
    dispatch(
      postBlogCommentDB({
        comment: commentRefInput.current.value,
        id: parseInt(id),
      }),
    );
    commentRefInput.current.value = "";
  };

  return (
    <SComment>
      <SProFile />

      <input
        type="text"
        ref={commentRefInput}
        placeholder={"20자이하"}
        maxLength="20"
      />

      <button onClick={addComment}>추가하기</button>
    </SComment>
  );
};
const SComment = styled.div`
  width: 1220px;
  border-top: 1px solid #939393;
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;

  input {
    width: 962px;
    margin-left: 27px;

    border: 1px solid #c0c0c0;
    border-radius: 30px;
  }
  button {
    position: relative;
    right: 3%;
    width: 114px;
    height: 44px;
    background: #2776ed;
    border: 1px solid #2776ed;
    border-radius: 30px;
  }
`;
const SProFile = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${profilecomment});
  width: 44px;
  height: 44px;
`;

export default CommentAdd;
