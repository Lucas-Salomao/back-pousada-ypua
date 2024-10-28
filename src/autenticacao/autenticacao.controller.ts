import { Controller, Post, Body } from '@nestjs/common';
import { AutenticaDto } from './dto/autenticacao.dto';
import { AutenticacaoService } from './autenticacao.service';


@Controller()
export class AutenticacaoController {
    constructor(private readonly autenticacaoService: AutenticacaoService) {}

    @Post('login')
    login(@Body(){email, senha}: AutenticaDto) {
        return this.autenticacaoService.login(email, senha);
    }
}
