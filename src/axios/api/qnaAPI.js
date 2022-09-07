import instance from "../axios";

export const qnaApi = {
  //게시글 조회
  getList: () => instance.get("/qna"),
  //게시글 상세조회
  getOneList: id => instance.get(`/qna/${id}`),
  //게시글 작성
  postList: data => instance.post("/qna", data),
  //게시글 수정
  editList: data => instance.put(`/qna/${data.id}`, data),
  //게시글 즐겨찾기 조회
  getBookmarkList: () => instance.get("/qna/bookmark"),
  //게시글 즐겨찾기 추가
  postBookmarkList: data => instance.post(`/qna/${data.qna_id}/bookmark`),
  //게시글 즐겨찾기 삭제
  deleteBookmarkList: data => instance.delete(`/qna/${data.qna_id}/bookmark`),
  //게시글 추천목록 조회
  getQnaLikeList: () => instance.get(`qna/like`),
  //게시글 추천
  likeQnaList: data => instance.post(`qna/${data.qna_id}/like`),
  //게시글 추천 취소
  dislikeQnaList: data => instance.delete(`qna/${data.qna_id}/like`),
  //댓글 조회
  getCommentList: id => instance.get(`/qna/${id}/comments`),
  //댓글 작성
  postCommentList: data =>
    instance.post(`/qna/${data.id}/comments`, { comment: data.content }),
  //댓글 삭제
  deleteCommentList: id => instance.delete(`/qna/comments/${id}`),
  //댓글 수정
  editCommentList: data => instance.edit(`/qna/comments/${data.id}`, data),
  //댓글 추천
  likeCommentList: (commentId, id) =>
    instance.post(`/qna/comments/${commentId}/like`),
  //댓글 추천
  dislikeCommentList: (commentId, id) =>
    instance.delete(`/qna/comments/${commentId}/like`),
  //댓글 채택
  choiceCommentList: data => instance.post(`/qna/comments/${data.id}/choice`),
};