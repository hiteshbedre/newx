endgrid Config
import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);
try:
    bomb_email = input("Enter Email address on Whom you want to perfom this attack: ")
    email = input("Enter your gmail_address:")
    password = input("Enter your gmail_password:")
    message = input("Enter Message:")
    counter = int(input("How many message you want to send?:"))

    # gmail of outlook
    s_ = input('Select the service provider (Gmail / Outlook): ').lower()

    if s_ == "gmail":
        mail = smtplib.SMTP('smtp.gmail.com',587)
    elif s_ == "outlook":
        mail = smtplib.SMTP('smtp.office365.com',587)

    for x in range(0,counter):
        print("Number of Message Sent : ", x+1)
        mail.ehlo()
        mail.starttls()
        mail.login(email,password)
        mail.sendmail(email,bomb_email,message)
        time.sleep(1)

    mail.close()
except Exception as e:
    print("Something is wrong, please Re-try Again with Valid input.")
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About


// Functions

// Sends email to user after signup
export const welcomeEmail = functions.auth.user().onCreate(user => {

    const msg = {
        to: user.email,
        from: 'hello@fireship.io',
        templateId: TEMPLATE_ID,
        dynamic_template_data: {
            subject: 'Welcome to my awesome app!',
            name: user.displayName,
        },
    };

    return sgMail.send(msg);

});

// Sends email via HTTP. Can be called from frontend code. 
export const genericEmail = functions.https.onCall(async (data, context) => {


    if (!context.auth && !context.auth.token.email) {
        throw new functions.https.HttpsError('failed-precondition', 'Must be logged with an email address');
    }

    const msg = {
        to: context.auth.token.email,
        from: 'hello@fireship.io',
        templateId: TEMPLATE_ID,
        dynamic_template_data: {
            subject: data.subject,
            name: data.text,
        },
    };

    await sgMail.send(msg);

    // Handle errors here

    // Response must be JSON serializable
    return { success: true };

});
