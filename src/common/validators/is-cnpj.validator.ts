import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Expressão Regular para CNPJ (Formato: 00.000.000/0000-00)
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

@ValidatorConstraint({ async: false })
export class IsCnpjConstraint implements ValidatorConstraintInterface {
  validate(cnpj: any, args: ValidationArguments) {
    return (
      typeof cnpj === 'string' && cnpjRegex.test(cnpj) && this.isValidCnpj(cnpj)
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'O CNPJ ($value) não é válido!';
  }

  private isValidCnpj(cnpj: string): boolean {
    const cleanedCnpj = cnpj.replace(/[^\d]+/g, '');

    if (cleanedCnpj.length !== 14) return false;

    if (/^(\d)\1{13}$/.test(cleanedCnpj)) return false;

    let tamanho = cleanedCnpj.length - 2;
    let numeros = cleanedCnpj.substring(0, tamanho);
    const digitos = cleanedCnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cleanedCnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
  }
}

export function IsCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCnpjConstraint,
    });
  };
}
