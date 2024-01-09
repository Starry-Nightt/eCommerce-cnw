import { Avatar, Button, Flex, Input, Rate } from "antd";
import useAuth from "@/hooks/use-auth";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

const { TextArea } = Input;

import React, { useState } from "react";
import { Comment, CommentDetail } from "@/models/comment.model";
import AvatarHeader from "./avatar-header";

interface Props {
  onAddComment: (comment: any) => void;
}

function BookUserComment({ onAddComment }: Props) {
  const { user, loggedIn } = useAuth();
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(null);
  const desc = ["Rất tệ", "Tệ", "Ổn", "Tốt", "Tuyệt vời"];


  const onComment = () => {
    const newComment= {
      content: comment,
      score: rate,
      user_id: user.id
      // name: user.name,
    };
    onAddComment(newComment);
    setComment("");
    setRate(null);
  };

  return (
    <>
      {loggedIn ? (
        <div className="p-3 flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            {user.avatar ? (
              <Avatar src={user.avatar} />
            ) : (
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#87d068" }}
              />
            )}

            <span>{user?.email}</span>
          </div>
          <Rate tooltips={desc} value={rate} onChange={(e) => setRate(e)}></Rate>
          <TextArea
            value={comment}
            showCount
            maxLength={100}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập đánh giá người dùng"
            style={{ height: 120, resize: "none" }}
            className="my-2"
          />
          <div className="flex justify-end mt-3">
            <Button
              type="primary"
              disabled={!rate || comment.trim().length == 0}
              onClick={onComment}
            >
              Bình luận
            </Button>
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
