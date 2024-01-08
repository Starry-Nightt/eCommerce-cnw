import { Comment, CommentDetail } from "@/models/comment.model";
import { Avatar, Button, List, Rate, Skeleton, Typography } from "antd";
import axios from "axios";
import React, { memo, useEffect, useMemo, useState } from "react";
import useAuth from "@/hooks/use-auth";
import BookUserComment from "./book-user-comment";
import BookService from "@/services/book.service";

interface Props {
  comments: Comment[];
  bookId: string;
}

function BookComments({ comments, bookId }: Props) {
  const [commentList, setCommentList] = useState(comments ?? []);
  const { user, loggedIn } = useAuth();
  const userComment = useMemo(
    () =>
      commentList && loggedIn
        ? commentList.find((it) => it.user_id?._id === user.id)
        : null,
    [commentList]
  );
  const onAddComment = async (comment: CommentDetail) => {
    await BookService.createCommentBook(bookId, comment).then((res) => {
      setCommentList((prev) => [{...res, user_id: {name: 'BẠN'}}, ...prev]);
    });
  };

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  if (!commentList ) {
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
      {!userComment && !user?.isAdmin && (
        <BookUserComment onAddComment={onAddComment} />
      )}

      {commentList && !!commentList.length && <List
        itemLayout="horizontal"
        dataSource={commentList}
        renderItem={(item, idx) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={user?.avatar ?? "/static/images/avatar-default.jpg"}
                />
              }
              title={
                <div className="flex gap-3 items-center">
                  <span>
                    {loggedIn && item.user_id?._id === user?.id ? "BẠN" : item.user_id ? item.user_id.name : "" }
                  </span>
                  <Rate
                    value={
                      item.score
                    }
                    disabled
                  ></Rate>
                </div>
              }
              description={item.content}
            />
          </List.Item>
        )}
      />}
    </div>
  );
}

export default memo(BookComments);
