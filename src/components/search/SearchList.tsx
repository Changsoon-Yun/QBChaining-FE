import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "redux/config/configStore";

//무한스크롤
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";
//컴포넌트
import ContentList from "../common/ContentList";
//통신
import {
  getBlogSearchListDB,
  getQnaSearchListDB,
} from "../../redux/async/search";

type TSearchList = {
  searchWord: string;
  type: string;
};

const SearchList = ({ searchWord, type }: TSearchList) => {
  const dispatch: AppDispatch = useDispatch();
  const { qnaSearchList, blogSearchList, isFetching } = useSelector(
    (state: RootState) => state.searchSlice,
  );

  const [endid, setEndid] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [target, inView] = useInView();

  useEffect(() => {
    setEndid(0);
    setHasNextPage(true);
    window.scrollTo(0, 0);
  }, [searchWord]);

  //무한스크롤
  useEffect(() => {
    let data = {
      word: searchWord,
      endid,
    };

    //qnalist 조회 후 res.payload.length가 10이라면 다음페이지 존재

    if (type === "qna") {
      dispatch(getQnaSearchListDB(data)).then(res => {
        setHasNextPage(res.payload.length === 10);
      });
    } else if (type === "blog") {
      dispatch(getBlogSearchListDB(data)).then(res => {
        setHasNextPage(res.payload.length === 10);
      });
    }
  }, [searchWord, endid]);

  //페이지가 바닥에 닿을때마다 SearchList의 마지막id를 구해 endid를 변경
  useEffect(() => {
    if (type === "qna") {
      if (qnaSearchList.length !== 0 && inView && hasNextPage) {
        setEndid(qnaSearchList[qnaSearchList.length - 1].id);
      }
    } else if (type === "blog") {
      if (blogSearchList.length !== 0 && inView && hasNextPage) {
        setEndid(blogSearchList[blogSearchList.length - 1].id);
      }
    }
  }, [inView]);

  if (type === "qna") {
    return (
      <>
        {qnaSearchList.length !== 0 ? (
          qnaSearchList.map(data => (
            <ContentList
              isSearch={true}
              type={type}
              data={data}
              key={nanoid()}
            />
          ))
        ) : (
          <SNodata>검색결과가 없습니다.</SNodata>
        )}
        {!isFetching && hasNextPage && (
          <SLoading ref={target}>
            <ClipLoader />
          </SLoading>
        )}
      </>
    );
  } else if (type === "blog") {
    return (
      <>
        {blogSearchList.length !== 0 ? (
          blogSearchList.map(data => (
            <ContentList
              isSearch={true}
              type={type}
              data={data}
              key={nanoid()}
            />
          ))
        ) : (
          <SNodata>검색결과가 없습니다.</SNodata>
        )}
        {!isFetching && hasNextPage && (
          <SLoading ref={target}>
            <ClipLoader />
          </SLoading>
        )}
      </>
    );
  }
};

export default SearchList;

const SNodata = styled.div`
  padding-left: 30px;
  border: ${props => props.theme.color.grey3};
  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  margin: 30px 0;
  min-height: 209px;
  background-color: ${props => props.theme.color.white};
  font-size: 22px;
  color: ${props => props.theme.color.grey5};
  display: flex;
  align-items: center;
`;

const SLoading = styled.div`
  min-height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
