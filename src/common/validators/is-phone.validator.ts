import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPhoneConstraint implements ValidatorConstraintInterface {
  validate(phone: any, args: ValidationArguments) {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return typeof phone === 'string' && phoneRegex.test(phone);
  }

  defaultMessage(args: ValidationArguments) {
    return 'O telefone ($value) não é um número válido!';
  }
}

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneConstraint,
    });
  };
}
