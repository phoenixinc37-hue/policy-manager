import os
from dotenv import load_dotenv
from agentmail import AgentMail

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='CCA status request draft',
    text='''To: service@cca.ca\nSubject: Status Request, Account WD4621, File 10302793\n\nHello,\n\nCan you please provide me with a status update on account WD4621 and file 10302793?\n\nPlease let me know the current status, any recent activity, and whether there is anything outstanding that requires my attention.\n\nThank you,\n\nScott Wilde'''
)

print(response)
