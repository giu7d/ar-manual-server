import { IMailProvider, IMessage } from "../IMailProvider";

export class MailtrapMailProvider implements IMailProvider {
  async sendMail(message: IMessage): Promise<void> {
    console.log(">\t\tEmail sent!");
    console.log(message);
  }
}
