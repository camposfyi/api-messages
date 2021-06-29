import { DefaultApiMessages, defaultApiMessages } from './default-api-messages';
import { ApiMessagesConfiguration } from './api-messages-configuration';

export default class ApiMessages {
  private messages: any;

  configure(configuration: ApiMessagesConfiguration): Promise<void> {
    return import(configuration.source).then((result) => {
      this.messages = result;
    });
  }

  get isInitialized(): boolean {
    return this.messages !== undefined;
  }

  get defaults(): DefaultApiMessages {
    return defaultApiMessages;
  }

  get(propertyPath: string = '', replacements = {}): string {
    const props = propertyPath.split('.');
    let message = this.getPropertyValue(this.messages, props);

    const keys = Object.keys(replacements);
    keys.forEach((key) => {
      const replacementValue = this.getPropertyValue(replacements, [key]);
      message = message.replace(`#{${key}}`, replacementValue);
    });

    return message;
  }

  private getPropertyValue(obj: any, props: string[]): any {
    return (
      obj &&
      props.reduce((result, prop) => {
        return result == null ? undefined : result[prop];
      }, obj)
    );
  }
}
