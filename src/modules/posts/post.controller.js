import Post from './post.model';
import HTTPStatus from 'http-status';

export async function createPost(req, res) {
  try {
    const post = await Post.createPost(req.body, req.user._id);
    return res.status(HTTPStatus.CREATED).json(post);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}

export async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.param.id);
    return res.status(HTTPStatus.OK).json(post);
  } catch (error) {
    return res.status(HTTPStatus.BAD_REQUEST).json(error);
  }
}