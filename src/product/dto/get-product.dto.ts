import { Transform, Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString, IsBoolean } from 'class-validator';

export class GetProductDto {
  @IsOptional()
  @IsString()
  @Type(() => IsString)
  type?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => IsBoolean)
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })

  hit?: boolean;
  @IsOptional()
  @IsBoolean()
  @Type(() => IsBoolean)
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })

  sale?: boolean;
  @IsOptional()
  @IsBoolean()
  @Type(() => IsBoolean)
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  new?: boolean;

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
