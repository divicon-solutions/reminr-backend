import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import Mailgun, { MailgunMessageData } from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';

@Injectable()
export class EmailService {
  private client: IMailgunClient;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('mailGun.apiKey');
    const mailGun = new Mailgun(FormData);
    this.client = mailGun.client({ username: 'api', key: apiKey });
  }

  async sendEmail(data: Pick<MailgunMessageData, 'subject' | 'html' | 'text'>) {
    try {
      const domain = this.configService.get<string>('mailGun.domain');
      const receiverEmails = this.configService.get<string[]>(
        'mailGun.receiverEmails',
      );
      const response = await this.client.messages.create(domain, {
        from: 'No Reply <no-reply@reminrap.com>',
        to: receiverEmails,
        subject: data.subject,
        html: data.html,
        text: data.text,
      });
      return response.message;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
