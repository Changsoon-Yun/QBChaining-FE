import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

//이미지
import LeftArrow from "../../assets/images/LeftArrow.png";
import logo from "../../assets/images/logo.png";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <SLanding>
      <Helmet>
        <title>QB-Chaning</title>
      </Helmet>
      <div className="logo"></div>
      <div className="goQna container">
        <SNavigateButton
          onClick={() => {
            navigate("/qna");
          }}
        >
          <span className="arrow"></span>Q&A
        </SNavigateButton>
      </div>
      <div className="goBlog container">
        <SNavigateButton
          onClick={() => {
            navigate("/blog");
          }}
        >
          블로그<span className="arrow right"></span>
        </SNavigateButton>
      </div>
    </SLanding>
  );
};

export default Landing;

const SLanding = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  background: ${props => props.theme.color.mainIvory};
  display: flex;
  gap: 200px;

  & .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${logo});
    width: 707px;
    height: 537px;

    &::before {
      content: "오직 개발자를 위한 공간";
      position: absolute;
      width: 100%;
      bottom: -50px;
      left: 0;
      font-size: 20;
      font-weight: 400;
      text-align: center;
      color: #1e1e1e;
    }
  }

  & .container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1;
    & .arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: ${props => props.theme.color.mainNavy};
      font-weight: 900;
      font-size: 20px;
      margin: 0 20px;
      background-image: url(${LeftArrow});
      background-repeat: no-repeat;
      background-position: center;
      transition: 0.3s;

      &.right {
        transform: rotate(180deg);
      }
    }
  }
`;

const SNavigateButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.color.mainNavy};
  font-weight: 400;
  font-size: 24px;
  padding: 30px;
  &:hover .arrow {
    background-color: ${props => props.theme.color.mainOrange};
  }
`;
