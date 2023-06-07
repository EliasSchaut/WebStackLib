import { registerDecorator, ValidationOptions } from 'class-validator';
import { cron_pattern } from '@/common/validation/patterns/cron.pattern';

export function IsCron(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCron',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'undefined' ||
            (typeof value === 'string' && cron_pattern.test(value))
          );
        },
      },
    });
  };
}
