import { Avatar, Button, Flex, Input, Rate } from "antd";
import useAuth from "@/hooks/use-auth";

const { TextArea } = Input;

import React, { useState } from "react";
import { Comment } from "@/models/comment.model";

interface Props {
    onAddComment: (comment: Comment) => void
}

function BookUserComment({onAddComment}: Props) {
  const { user, loggedIn } = useAuth();
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(null)

  const onComment = () => {
    const newComment: Comment = {
        id: `${Math.floor(Math.random() * 10000)}`,
        email: user.email,
        body: comment,
        score: rate,
        userId: user.id
    }
    onAddComment(newComment)
  }

  return (
    <>
      {loggedIn ? (
        <div className="p-3 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <Avatar src={user.avatar} />

            <span>{user?.email}</span>
          </div>
          <Rate value={rate} onChange={(e) => setRate(e)} ></Rate>
          <TextArea
            showCount
            maxLength={100}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập đánh giá người dùng"
            style={{ height: 120, resize: "none" }}
            className="my-2"
          />
          <div className="flex justify-end mt-3">
            <Button type="primary" disabled={!rate || comment.trim().length == 0} onClick={onComment}>Bình luận</Button>
          </div>
        </div>
      ) : (
        <>
          <p className="font-medium text-lg mb-4">Đăng nhập để bình luận</p>
        </>
      )}
    </>
  );
}

export default BookUserComment;
