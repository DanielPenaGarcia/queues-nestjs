export class IsStringOrNumber {
  validate(value: any): boolean {
    return typeof value === 'string' || typeof value === 'number';
  }

  defaultMessage() {
    return 'Value must be a string or a number';
  }
}