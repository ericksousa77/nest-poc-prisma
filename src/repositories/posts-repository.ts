import { Post as PostModel } from '@prisma/client';
import { CreatePostBody } from 'src/dtos/create-post';

// interface postCreateParams {
//   title: string;
//   content: string;
//   authorId: string;
//   published?: boolean;
// }

export abstract class PostsRepository {
  abstract create(postData: CreatePostBody): Promise<PostModel>;
  abstract index(): Promise<PostModel[]>;
}
