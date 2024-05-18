import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { IsOptional, IsString, IsUrl, ValidateNested } from 'class-validator';
import { CreateTestQuestionDto } from './create-test-question.dto';
import { User, $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export type CreateTestDtoAuthorId = CreateTestDto & { authorId: User['id'] };
export class CreateTestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({ enum: $Enums.Subject, enumName: 'Subject', required: false })
  @IsOptional()
  @IsEnum($Enums.Subject)
  subject?: $Enums.Subject;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTestQuestionDto)
  questions: CreateTestQuestionDto[];
}
