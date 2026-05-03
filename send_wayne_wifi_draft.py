import os
from dotenv import load_dotenv
from agentmail import AgentMail

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Draft to Wayne - WiFi and camera system access',
    text='''Subject: WiFi and Camera System Access

Hi Wayne,

Can you please send me the WiFi passwords for all clinics, the St. Albert house, and the lake house?

As well, can you please send me the username and password for the CSI camera system?

Thank you,

Scott'''
)

print(response)
