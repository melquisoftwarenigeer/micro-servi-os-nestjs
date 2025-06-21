import { IsNotEmpty, IsOptional, IsEnum, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(['Ativo', 'Inativo'])
  status?: 'Ativo' | 'Inativo';

  @IsOptional()
  @IsNumber()
  budget?: number;
}
