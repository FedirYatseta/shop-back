import { Transform, Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class GetProductDto {
  @IsOptional()
  @IsString()
  @Type(() => IsString)
  type?: string;
  @IsOptional()
  @IsNumber()
  @Type(() => IsNumber)
  @Transform(({ value }) => {
    return parseInt(value);
  })
  limit?: number;

  @IsOptional()
  @IsString()
  cursor?: string;

}
