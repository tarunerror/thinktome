// Quick script to generate test email credentials
import nodemailer from 'nodemailer';

async function setupTestEmail() {
  // Generate test SMTP service account from ethereal.email
  const testAccount = await nodemailer.createTestAccount();
  
  console.log('\n🎉 Test Email Account Created!');
  console.log('\nAdd these to your .env file:\n');
  console.log(`SMTP_HOST=${testAccount.smtp.host}`);
  console.log(`SMTP_PORT=${testAccount.smtp.port}`);
  console.log(`SMTP_SECURE=false`);
  console.log(`SMTP_USER=${testAccount.user}`);
  console.log(`SMTP_PASS=${testAccount.pass}`);
  console.log(`SMTP_TO_EMAIL=its.tarun01@gmail.com`);
  console.log('\n📧 View emails at: https://ethereal.email/login');
  console.log(`   Username: ${testAccount.user}`);
  console.log(`   Password: ${testAccount.pass}`);
  console.log('\nNote: This is for TESTING only. Use Gmail for production.\n');
}

setupTestEmail().catch(console.error);
