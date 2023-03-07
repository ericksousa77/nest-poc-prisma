import { IsNotEmpty, IsOptional, IsUUID, Length } from 'class-validator';

export class CreatePostBody {
  @IsNotEmpty({ message: 'the title is required' })
  @Length(5, 50)
  title: string;

  @IsNotEmpty({ message: 'the content is required' })
  @Length(5, 200)
  content: string;

  @IsOptional()
  published: boolean;

  @IsUUID('4')
  authorId: string;
}
