
export class ShowUsuarioDTO {
    constructor(
        readonly id:string,
        readonly nome:string,
        readonly email:string,
        readonly rg:string,
        readonly cpf:string,
        readonly role:string
    ){}
}