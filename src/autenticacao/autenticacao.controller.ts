import { Controller, Post, Body } from '@nestjs/common';
import { AutenticaDto } from './dto/autenticacao.dto';
import { AutenticacaoService } from './autenticacao.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('autenticacao')
@Controller()
export class AutenticacaoController {
    constructor(private readonly autenticacaoService: AutenticacaoService) {}

    @ApiOperation({ summary: 'Autentica um usuário' })
    @Post('login')
    login(@Body(){email, senha}: AutenticaDto) {
        return this.autenticacaoService.login(email, senha);
    }
}
