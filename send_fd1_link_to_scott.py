import os
from dotenv import load_dotenv
from agentmail import AgentMail

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Policy Manager FD1 URL',
    text='Policy Manager FD1:\n\nfile:///Users/scottwilde/.openclaw/workspace/releases/policy-manager/policy-manager-FD1.zip'
)

print(response)
