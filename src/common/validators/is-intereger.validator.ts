import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsIntegerConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return typeof value === 'number' && Number.isInteger(value);
  }

  defaultMessage(args: ValidationArguments) {
    return 'O valor ($value) deve ser um número inteiro!';
  }
}

export function IsInteger(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsIntegerConstraint,
    });
  };
}
