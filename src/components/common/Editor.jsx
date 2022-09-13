import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
//유틸 카테고리
import categories from "../../utils/category";
// firebase storage
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//로딩이미지
import loadingImage from "../../assets/images/Loading_icon.gif";
import selectArrow from "../../assets/images/SelectArrow.png";
//에디터
import ToastEditor from "../editor/ToastEditor";

//에러알럿
import { errorAlert } from "../../utils/swal";

import {
  patchBlogCommunityDB,
  postBlogCommunityDB,
} from "../../redux/async/blog";

import {
  editQnaListDB,
  postCommentListDB,
  postQnaListDB,
} from "../../redux/async/qna";

const Editor = ({
  isEdit,
  isWrite,
  isCommentWrite,
  isBlogEdit,
  isBlogWrite,
  id,
  blogEditId,
  editData,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tagText = useRef();
  const titleText = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("JavaScript");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const location = window.location.pathname;

  const { isLogin, userName, color } = useSelector(state => state.userSlice);

  // const selectLocalImage = () => {
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files[0];

  //     //현재 커서의 위치 저장
  //     const range = quill.getSelection(true);
  //     //업로드중 로딩이미지 삽입
  //     quill.insertEmbed(range.index, "image", loadingImage);
  //     try {
  //       //firebase에 이미지 업로드
  //       const uploaded_file = await uploadBytes(
  //         ref(storage, `images/${Date.now()}`),
  //         file,
  //       );

  //       //firebase에 올라간 이미지url 저장
  //       const file_url = await getDownloadURL(uploaded_file.ref);

  //       //로딩중 이미지 삭제
  //       quill.deleteText(range.index, 1);

  //       //firebase에 이미지 업로드 완료 후 url 추출후 textEditor에 삽입
  //       quill.insertEmbed(range.index, "image", file_url);

  //       //유저 편의를 위해 커서를 이미지 오른쪽에 위치
  //       quill.setSelection(range.index + 1);
  //     } catch (error) {
  //       //이미지 업로드 실패시 로딩이미지 삭제
  //       quill.deleteText(range.index, 1);
  //     }
  //   };
  // };

  //생성 or 수정 함수
  const onSubmitHandler = e => {
    e.preventDefault();
    //로그인이 안되어있을때 알럿
    if (!isLogin) {
      errorAlert("로그인이 필요한 기능입니다!");
      return;
    }

    //제목이 빈칸일때 알럿
    if (titleText.current !== undefined && titleText.current.value.length < 1) {
      errorAlert("제목을 입력해주세요!");
      return;
    }
    if (!isCommentWrite) {
      if (tags.length < 1) {
        errorAlert("최소 1개의 태그가 필요합니다!");
        return;
      }
    }

    //본문이 빈칸일때 알럿
    // if (quill.getText().length < 2) {
    //   errorAlert("본문을 입력해주세요!");
    //   return;
    // }

    //수정중이라면
    if (isEdit) {
      dispatch(
        editQnaListDB({
          title,
          content,
          id: editData.id,
          category: category,
          tag: tags,
        }),
      ).then(res => {
        navigate("/qna");
      });
      //생성중이라면
    } else if (isWrite) {
      dispatch(
        postQnaListDB({
          title,
          content,
          category: category,
          tag: tags,
        }),
      ).then(res => {
        navigate("/qna");
      });
      //코멘트작성
    } else if (isCommentWrite) {
      dispatch(
        postCommentListDB({
          content,
          id: parseInt(id),
          honey_tip: 0,
          user_name: userName,
        }),
      );
      //작성 후 입력 값 초기화
      // quillRef.current.firstChild.innerHTML = "";
      //블로그 수정, 생성
    } else if (isBlogWrite) {
      navigate("/blog");
      dispatch(
        postBlogCommunityDB({
          title,
          content,
          tag: tags,
        }),
      );
    } else if (isBlogEdit) {
      navigate(`/blog/detail/${blogEditId}`);
      dispatch(
        patchBlogCommunityDB({
          title,
          content,
          id: blogEditId,
        }),
      );
    }
  };

  //titlechangehandler
  const onTitleChangeHandler = e => {
    setTitle(e.target.value);
  };
  //edit상황이라면 타이틀, content 가져오기
  useEffect(() => {
    if (isEdit) {
      setTitle(editData.title);
      setCategory(editData.category);
      // quillRef.current.firstChild.innerHTML = editData.content;
    }
  }, [isEdit, editData]);

  const onCategoryChangeHandler = e => {
    setCategory(e.target.value);
  };

  //태그입력
  const onChangeTagHandler = e => {
    setTag(e.target.value);
  };

  //태그추가
  const onAddTagHandler = () => {
    if (tagText.current.value.length < 1) {
      errorAlert("빈칸입니다.");
      return;
    }
    setTags([...tags, tag]);
    setTag("");
    tagText.current.value = "";
  };

  return (
    <Sform>
      <div>
        {(isEdit || isWrite || isBlogWrite || isBlogEdit) && (
          <div className="titleWrapper">
            <input
              id="title"
              value={title || ""}
              onChange={onTitleChangeHandler}
              type="text"
              ref={titleText}
              maxLength="30"
              placeholder="제목을 입력해주세요."
            />
            {(isEdit || isWrite) && (
              <Select
                onChange={onCategoryChangeHandler}
                defaultValue={category}
                value={isEdit && category}
                name="category"
                id="category"
                required
                arrow={selectArrow}
              >
                <option disabled hidden value="카테고리를 선택해 주세요">
                  카테고리를 선택해 주세요
                </option>
                {categories.qnaCategory.map(data => (
                  <option key={data.langId} value={data.langName}>
                    {data.langName}
                  </option>
                ))}
              </Select>
            )}
          </div>
        )}
        <ToastEditor
          isCommentWrite={isCommentWrite}
          content={content}
          setContent={setContent}
        />
      </div>
      <SSubmitWrapper>
        {(isEdit || isWrite || isBlogWrite || isBlogEdit) && (
          <STagContainer>
            <SInputContainer>
              <input
                type="text"
                id="tag"
                ref={tagText}
                onChange={onChangeTagHandler}
                maxLength="20"
                placeholder="태그를 추가해 주세요."
              />
              <SAddButton type="button" onClick={onAddTagHandler}>
                추가
              </SAddButton>
            </SInputContainer>
            {tags.map((data, i) => (
              <STags className="tags" key={i}>
                {data}
              </STags>
            ))}
          </STagContainer>
        )}
        {isCommentWrite ? (
          <SCommentWriteButton type="submit" onClick={onSubmitHandler}>
            제출하기
          </SCommentWriteButton>
        ) : (
          <SSubmitButton
            type="submit"
            onClick={onSubmitHandler}
            location={location}
          >
            {isEdit || isWrite || isBlogWrite || isBlogEdit
              ? "제출하기"
              : "댓글쓰기"}
          </SSubmitButton>
        )}
      </SSubmitWrapper>
    </Sform>
  );
};

export default Editor;

const Sform = styled.form`
  display: flex;
  flex-direction: column;
  & .titleWrapper {
    display: flex;
    margin-bottom: 18px;
    & #title {
      width: 70%;
      margin-right: 26px;
      padding: 10px 13px;
      border: 1px solid #939393;
    }
  }
`;

const SSubmitWrapper = styled.div`
  position: relative;
  width: 100%;
  justify-content: space-between;
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  min-width: 251px;
  width: 30%;
  padding: 10px 30px;
  appearance: none;
  background-image: url(${props => props.arrow});
  background-repeat: no-repeat;
  background-position: center right 30px;
  border: 1px solid #939393;
  border-radius: 30px;

  & option {
    border: 1px solid #939393;
    border-radius: 30px;
  }
`;

const STagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* margin-right: 50px; */
`;

const SInputContainer = styled.div`
  position: relative;
  & input {
    padding: 10px 82px 10px 25px;
    border: 1px solid #939393;
    border-radius: 30px;
    margin-bottom: 10px;
  }
`;

const SAddButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  margin-left: 4px;
  background-color: ${props => props.theme.color.grey5};
  border: 1px solid ${props => props.theme.color.grey5};
  color: ${props => props.theme.color.white};
`;

const STags = styled.div`
  padding: 10px 32px;
  border: none;
  border-radius: 30px;
  margin: 0 10px 10px 10px;
  background: ${props => props.theme.color.grey3};
  min-width: 100px;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.color.white};
`;

const SSubmitButton = styled.button`
  height: 38px;
  min-width: 140px;
  background-color: ${props =>
    props.location.includes("qna")
      ? props.theme.color.mainGreen
      : props.theme.color.mainBlue};
  border: 1px solid
    ${props =>
      props.location.includes("qna")
        ? props.theme.color.mainGreen
        : props.theme.color.mainBlue};
  color: ${props => props.theme.color.white};
`;

const SCommentWriteButton = styled.button`
  position: absolute;
  right: 0;
  bottom: -37px;
  height: 38px;
  min-width: 140px;
  color: ${props => props.theme.color.mainGreen};
  border: none;
  background-color: ${props => props.theme.color.white};
  font-weight: 600;
`;
