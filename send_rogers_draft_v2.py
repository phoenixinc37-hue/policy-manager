import os
from dotenv import load_dotenv
from agentmail import AgentMail

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='UPDATED Draft to Rogers - Includes email address',
    text='''To: inquiries.s@rci.rogers.com
Subject: Request for Billing Breakdown and Internet-Only Pricing

Hello,

I'm writing regarding the Rogers Business bill for Clinic Solutions Inc O/A Rosslyn Veterinary Clinic.

From the invoice I have:
- Account Number: 18074
- Invoice Number: 3182773
- Invoice Date: November 30, 2025
- Service Number: 51386
- Phone Number listed: 780-475-9912
- Service Location: 13540 97 St NW, Edmonton, AB
- Product Description: Advantage Voice
- Current Charges: $304.08 (Next Month MRC $289.60 + GST $14.48)

Can you please provide me with a detailed breakdown of this bill?

As well, can you please let me know what the monthly cost would be if the Advantage Voice / phone service was removed from this account and only the remaining services stayed active?

Thank you,

Scott Wilde'''
)

print(response)
