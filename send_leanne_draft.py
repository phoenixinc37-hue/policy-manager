import os
from dotenv import load_dotenv
from agentmail import AgentMail

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Draft to Leanne Weintz (Kelowna Condo 609)',
    text='''To: leanne@realty-one.ca
Subject: Re: April rental statement - Playa del Sol Unit 609

Hi Leanne,

Thank you for all the updates and the April rental statement.

Tammy and I are currently getting divorced and are working through a settlement agreement. Because of this, I need to gather some specific information for that purpose. 

Could you please provide your thoughts on the following regarding Unit 609:

1. What is the current status of the condo regarding finding a long-term renter and a signed lease?
2. Do you have any thoughts on whether Playa del Sol might ever be exempt from the current short-term rental restrictions?
3. What are your thoughts on the current Kelowna condo resale market?
4. If we were to list Unit 609, what would be a realistic selling price right now, and what are the average days on market?

I appreciate your help with this.

Thanks,

Scott Wilde'''
)

print(response)
