interface IValidationStrategy {
  validate(value: string): boolean;
  getErrorMessage(): string;
}

class EmailValidationStrategy implements IValidationStrategy {
  validate(value: string): boolean {
    return value.includes('@');
  }

  getErrorMessage(): string {
    return 'Invalid email';
  }
}

class FormField {
  private validationStrategy: IValidationStrategy;
  private value: string;

  constructor(validationStrategy: IValidationStrategy, value: string) {
    this.validationStrategy = validationStrategy;
    this.value = value;
  }

  public validate(): boolean {
    return this.validationStrategy.validate(this.value);
  }

  public getErrorMessage(): string {
    if (!this.validate()) {
      return this.validationStrategy.getErrorMessage();
    }
    return '';
  }
}


const email = new FormField(new EmailValidationStrategy(), 'email@email.comn');
console.log('email.validate():', email.validate())
console.log('email.getErrorMessage();:', email.getErrorMessage())