const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

// GET  /api/posts       - Public: get all posts
router.get('/', getAllPosts);

// GET  /api/posts/:id   - Public: get single post
router.get('/:id', getPost);

// POST /api/posts       - Private: create post
router.post('/', protect, createPost);

// PUT  /api/posts/:id   - Private: update own post
router.put('/:id', protect, updatePost);

// DELETE /api/posts/:id - Private: owner or admin can delete
router.delete('/:id', protect, deletePost);

module.exports = router;
