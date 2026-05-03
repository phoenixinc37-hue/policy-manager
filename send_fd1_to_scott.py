import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

file_path = '/Users/scottwilde/.openclaw/workspace/releases/policy-manager/policy-manager-FD1.zip'
with open(file_path, 'rb') as f:
    b64_content = base64.b64encode(f.read()).decode('utf-8')

attachment = SendAttachment(
    filename='policy-manager-FD1.zip',
    content_type='application/zip',
    content=b64_content,
    content_disposition='attachment'
)

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Policy Manager FD1',
    text='Hi Scott,\n\nAttached is the locked FD1 copy of Policy Manager.\n\nBest,\nKate',
    attachments=[attachment]
)

print(response)
