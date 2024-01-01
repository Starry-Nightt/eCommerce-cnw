import COMMENTS from "shared/data/comments";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { bookId } = req.query;
    console.log("bookId", bookId);
    const comments = COMMENTS.filter((it) => it.bookId === bookId);
    const rating =
      comments.reduce((prev, cur) => {
        return prev + cur.score;
      }, 0) / comments.length;
    return res.status(200).json(rating);
  }
}
