import { IsNotEmpty, IsString } from 'class-validator';
export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsString()
  message: string;
}
