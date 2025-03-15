import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service'; // Ajuste o caminho conforme necessário

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly usuarioService: UsuarioService) {}

    async validate(email: string): Promise<boolean> {
        const usuario = await this.usuarioService.findByEmail(email);
        return usuario === undefined; // Retorna true se o e-mail não existir
    }

    defaultMessage(): string {
        return 'Email $value already exists. Choose another email.';
    }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailUniqueConstraint,
    });
  };
}