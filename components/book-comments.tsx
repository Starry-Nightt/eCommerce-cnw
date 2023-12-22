import { Comment } from "@/models/comment.model";
import { Avatar, Button, List, Rate, Skeleton, Typography } from "antd";
import axios from "axios";
import React, { memo, useEffect, useMemo, useState } from "react";
import useAuth from "@/hooks/use-auth";
import BookUserComment from "./book-user-comment";

interface Props {
  comments: Comment[];
}

function BookComments({ comments }: Props) {
  const [avatarArr, setAvatarArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState(comments ?? []);
  const { user, loggedIn } = useAuth();
  const userComment = useMemo(
    () =>
      commentList && loggedIn
        ? commentList.find((it) => it.userId === user.id)
        : null,
    [commentList]
  );
  const onAddComment = (comment: Comment) => {
    setCommentList((prev) => [comment, ...prev]);
  };
  useEffect(() => {
    setLoading(true);
    const fakeDataUrl = `https://randomuser.me/api/?results=${
      comments?.length ?? 100
    }&inc=picture`;
    axios
      .get(fakeDataUrl)
      .then((res) => {
        setAvatarArr(res.data?.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [commentList]);

  useEffect(() => {
    setCommentList(comments)
  }, [comments])

  if (!commentList || loading) {
    const items = new Array(4).fill(0);
    return (
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item, idx) => (
          <List.Item key={idx}>
            <Skeleton avatar title loading active></Skeleton>
          </List.Item>
        )}
      />
    );
  }

  return (
    <div>
      {!userComment && <BookUserComment onAddComment={onAddComment} />}

      <List
        itemLayout="horizontal"
        dataSource={commentList}
        renderItem={(item, idx) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={avatarArr[idx]?.picture?.large} />}
              title={
                <div className="flex gap-3 items-center">
                  <span>{loggedIn && item.userId === user?.id ? "BẠN" : item.email}</span>
                  <Rate
                    value={Math.floor(1 + Math.random() * 5)}
                    disabled
                  ></Rate>
                </div>
              }
              description={item.body}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default memo(BookComments);
