import COMMENTS from "shared/data/comments";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { bookId } = req.query;
    return res.status(200).json(COMMENTS.filter((it) => it.bookId === bookId));
  } else if (req.method === "POST") {
    const { bookId } = req.query;
    const comment = req.body;
    const newComment = {
      ...comment,
      bookId,
      id: Date.now().toString(),
    };
    COMMENTS.push(newComment);
    return res.status(201).json(newComment);
  }
}
