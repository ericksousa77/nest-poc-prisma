import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';
import { RegexHelper } from 'src/helpers/regex';
import { CreatePostBody } from '../post/create-post';

export class CreateUserBody {
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsNotEmpty({ message: 'the email is required' })
  email: string;

  @IsOptional()
  posts?: CreatePostBody[];

  @Matches(RegexHelper.password, { message: 'senha nao respeita as regras' })
  password: string;
}
