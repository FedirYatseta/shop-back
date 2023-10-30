import * as Mailgen from 'mailgen';

export class MailgenTemplates {
  async createResetPasswordTemplate(userName: string, link: string) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Email-app',
        link: 'https://galera-testing.web.app/',
        logo: 'https://galera-testing.web.app/logo192.png',
      },
    });

    const passwordEmail = {
      body: {
        name: userName,
        intro:
          'Welcome to Email-app! You have submitted a request to reset your password,' +
          ' please follow the further instructions in this email, if it is not you,' +
          ' please ignore this email.',
        action: {
          instructions: 'To reset your password please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Reset Password',
            link: link,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    return mailGenerator.generate(passwordEmail);
  }
}
