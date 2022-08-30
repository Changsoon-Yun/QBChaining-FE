import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./../pages/landing/Landing";
import MyPage from "./../pages/myPage/MyPage";
import QnaWrite from "./../pages/qna/QnaWrite";
import QnaMain from "./../pages/qna/QnaMain";
import BlogCommmunityMain from "./../pages/blog/BlogCommmunityMain";
import BlogPersonalMain from "./../pages/blog/BlogPersonalMain";
import BlogDetail from "../pages/blog/BlogDetail";
import QnaEdit from "./../pages/qna/QnaEdit";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/qna" element={<QnaMain />} />
      <Route path="/qna/write" element={<QnaWrite />} />
      <Route path="/qna/edit/:id" element={<QnaEdit />} />
      <Route path="/blog" element={<BlogCommmunityMain />} />
      <Route path="/blog/:id" element={<BlogPersonalMain />} />
      <Route path="/blog/detail/:postId" element={<BlogDetail />} />
    </Routes>
  );
};

export default router;
