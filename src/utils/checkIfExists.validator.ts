import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import mongoose, { Model } from 'mongoose';

export function IsExistsInModel(model: Model<any>, validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isExistsInModel',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model],
      async: true,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          if (!value) {
            return true;
          }

          if (mongoose.isValidObjectId(value)) {
            const instance = await model.findById(value);
            return !!instance;
          } else {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          const [model] = args.constraints;
          return `The specified ID does not exist in the ${model.modelName} Model.`;
        },
      },
    });
  };
}
