const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  updateCaption,
  commentOnPost,
  deleteComment,
} = require("../controllers/post");
const { getPostOfFollowing } = require("../controllers/user");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router
  .route("/posts/comment/:id")
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, deleteComment);
module.exports = router;
