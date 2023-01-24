import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  roomId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}

export class UpdateMessageDto {
  id: number;
}

export class FindMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  roomId: number;
}
