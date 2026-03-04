import { Resend } from 'resend';

const resend = new Resend('re_ARrRNgMD_3LzEVQgqqy5rXGB2PHo4r8Vt');

async function sendTestEmail() {
    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'muhammadanasq@gmail.com',
            subject: 'Hello World',
            html: '<p>Congrats on sending your <strong>first email</strong> from the CBT Website project!</p>'
        });
        console.log('Email sent successfully:', data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

sendTestEmail();
