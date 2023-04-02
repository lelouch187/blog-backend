import PostModel from '../models/Post.js';

export async function create(req, res) {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imgUrl: req.body.imgUrl,
      user: req.id,
    });
    const post = await doc.save();
    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json('Не удалось создать пост');
  }
}
export async function getAll(req, res) {
  try {
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json('Не удалось получить статьи');
  }
}
export async function getOne(req, res) {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
    );
    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(500).json('Не удалось получить статью');
  }
}
export async function deletePost(req, res) {
  try {
    const deletedPost = await PostModel.findByIdAndRemove(req.params.id);
    res.json(deletedPost);
  } catch (e) {
    console.log(e);
    res.status(500).json('Не удалось удалить статью');
  }
}
export async function updatePost(req, res) {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imgUrl: req.body.imgUrl,
    });
    res.json(updatedPost);
  } catch (e) {
    console.log(e);
    res.status(500).json('Не удалось обновить статью');
  }
}
