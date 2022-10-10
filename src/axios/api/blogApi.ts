import instance from "../axios";

export const blogApi = {
  //---블로그 커뮤니티---

  //블로그 메인 게시글 조회
  getBlogCommunityList: data =>
    instance.get(`posts?page=${data}&page_count=10`),
  // getBlogCommunityList: () => instance.get(`posts?page=0&page_count=10`),
  //블로그 디테일 조회
  getBlogDetail: id => instance.get(`/posts/${id}`),
  // 블로그 미리보기
  getPreView: id => instance.get(`/posts/${id}`),
  //블로그 게시글 생성
  postBlogCommunity: data => instance.post("/posts", data),
  //블로그 게시물 수정
  editBlogCommunity: data => instance.put(`/posts/${data.id}`, data),
  //블로그 게시물 삭제
  deleteBlogCommunity: id => instance.delete(`/posts/${id}`),

  //---블로그 댓글---

  //댓글 조회
  getBlogCommentList: id => instance.get(`/comments/${id}`),
  //댓글 추가
  postBlogComment: data => instance.post(`/comments/${data.id}`, data),
  //댓글 수정
  patchBlogComment: data => instance.put(`/comments/${data.id}`, data),
  //댓글 삭제
  DeleteBlogComment: id => instance.delete(`/comments/${id}`),

  //---마이블로그---
  //마이블로그 조회
  getMyBlog: id => instance.get(`/posts/my/${id}`),
  //유저마이블로그 조회
  getYouBlog: id => instance.get(`/posts/you/${id}`),

  //---블로그 게시글 북마크---
  //블로그 북마크 조회
  getBlogBookMark: () => instance.get(`/posts/bookmark/`),
  //블로그 북마크 추가
  postBlogBookMark: data => instance.post(`/posts/bookmark/${data.id}`),
  //블로그 북마크  삭제
  delBlogBookMark: id => instance.delete(`/posts/bookmark/${id}`),

  // ---블로그 게시글 좋아요---
  //블로그추천(좋아요)
  postBlogLike: id => instance.post(`/posts/like/${id}`),
  //블로그 추천삭제(좋아요삭제)
  unBlogLike: id => instance.delete(`/posts/like/${id}`),
  // 추천 많이 받은 블로그 조회
  getHotBlog: () => instance.get(`/posts/hits`),

  // ---댓글 좋아요---
  // 댓글 좋아요 추가
  postCommentLike: id => instance.post(`/comments/like/${id}`),
  // 댓글 좋아요 삭제
  delCommentLike: id => instance.delete(`/comments/like/${id}`),
};
