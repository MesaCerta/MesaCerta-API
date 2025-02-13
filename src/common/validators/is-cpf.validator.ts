import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Expressão Regular para CPF (Formato: 000.000.000-00)
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(cpf: any, args: ValidationArguments) {
    return (
      typeof cpf === 'string' && cpfRegex.test(cpf) && this.isValidCpf(cpf)
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'O CPF ($value) não é válido! Use o formato 000.000.000-00';
  }

  private isValidCpf(cpf: string): boolean {
    const cleanedCpf = cpf.replace(/[^\d]+/g, '');

    if (cleanedCpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCpf.charAt(i)) * (10 - i);
    }
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;

    if (parseInt(cleanedCpf.charAt(9)) !== firstDigit) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCpf.charAt(i)) * (11 - i);
    }
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;

    return parseInt(cleanedCpf.charAt(10)) === secondDigit;
  }
}

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfConstraint,
    });
  };
}
