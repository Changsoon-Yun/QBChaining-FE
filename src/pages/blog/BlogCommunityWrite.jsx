import React from "react";
import Editor from "../../components/common/Editor";
// import Tag from "../../components//blog/Tag";

const BlogCommunityWrite = () => {
  return (
    <div>
      <Editor isBlogWrite={true} />
      {/* <Tag /> */}
    </div>
  );
};

export default BlogCommunityWrite;