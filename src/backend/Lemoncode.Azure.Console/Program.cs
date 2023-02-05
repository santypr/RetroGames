

// See https://aka.ms/new-console-template for more information
using SendGrid.Helpers.Mail;
using SendGrid;

Console.WriteLine("Hello, World!");
await SendEmail();

static async Task SendEmail()
{
    var apiKey = "SENDGRID_APIKEY";
    var client = new SendGridClient(apiKey);
    var from = new EmailAddress("MAIL", "Lemoncode Testing");
    var subject = "Sending with SendGrid is Fun";
    var to = new EmailAddress("MAIL", "Lemoncode User");
    var plainTextContent = "and easy to do anywhere, even with C#";
    var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
    var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
    var response = await client.SendEmailAsync(msg);
    Console.WriteLine("Correo enviado");
}