import os
from dotenv import load_dotenv
from agentmail import AgentMail

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Draft to Jeffrey (Spray-Net)',
    text='''To: jeffrey.j@spray-net.com
Subject: Spray-Net Estimate - Jackfish Lake

Hi Jeffrey,

I stopped by your booth at the St. Albert trade show and signed up for an estimate. I know you tried to reach out earlier and I was slow getting back to you, but I am still interested in getting a quote for my house.

Let me know when you have time and we can confirm the details. The house is in Parkland County on Jackfish Lake (about 20 minutes west of Stony Plain).

Address:
3-52111 Range Road 25 (in the Rainbow Estates subdivision)

My cell is 780-918-1977. Feel free to call or text if that's easier to set up a time.

Thanks,

Scott Wilde'''
)

print(response)
