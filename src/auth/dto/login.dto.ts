import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
