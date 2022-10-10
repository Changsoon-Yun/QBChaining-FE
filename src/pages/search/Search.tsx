import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

//컴포넌트
import SearchList from "../../components/search/SearchList";

//검색 목록 초기화 슬라이스
import { removeSearchList } from "../../redux/modules/searchSlice";
const Search = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchWord = searchParams.get("q");

  useEffect(() => {
    return () => {
      dispatch(removeSearchList());
    };
  }, [searchWord]);

  return (
    <SSearch>
      <STitle>{searchWord}에 대한 검색결과</STitle>
      <SWrapper>
        <SLeftContainer>
          <SearchList searchWord={searchWord} type={"qna"} />
        </SLeftContainer>
        <SRightContainer>
          <SearchList searchWord={searchWord} type={"blog"} />
        </SRightContainer>
      </SWrapper>
    </SSearch>
  );
};

export default Search;

const SSearch = styled.div`
  min-width: 1300px;
  padding: 0 120px;
  margin: 0 auto;
`;

const STitle = styled.h2`
  font-size: 30px;
  font-weight: 400;
  padding-top: 70px;
`;

const SWrapper = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 70px;
`;

const STip = styled.div`
  width: 50%;

  & > div:first-child {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      text-align: center;
      padding-top: 10px;
      width: 160px;
      height: 90px;
      top: 0;
      transform: translateY(-50%);
      z-index: -1;
      left: 0;
      border-radius: 30px 30px 0 0;
      color: ${props => props.theme.color.white};
      font-size: 24px;
      font-weight: 600;
    }
  }
`;

const SLeftContainer = styled(STip)`
  & > div:first-child {
    &::before {
      content: "Q&A";
      background-color: ${props => props.theme.color.mainOrange};
    }
  }
`;

const SRightContainer = styled(STip)`
  & > div:first-child {
    &::before {
      content: "BLOG";
      background-color: ${props => props.theme.color.mainOrange};
    }
  }
`;
