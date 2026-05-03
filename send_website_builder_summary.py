import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

path = '/Users/scottwilde/.openclaw/workspace/context/website-builder-vs-jack-summary.md'
with open(path, 'rb') as f:
    b64_content = base64.b64encode(f.read()).decode('utf-8')

attachment = SendAttachment(
    filename='website-builder-vs-jack-summary.md',
    content_type='text/markdown',
    content=b64_content,
    content_disposition='attachment'
)

body = """Hi Scott,

Attached is the summary comparing the website builder company’s services and pricing to Jack’s website offer.

Best,
Kate
"""

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Website Builder vs Jack Summary',
    text=body,
    attachments=[attachment]
)
print('Sent successfully:', response)
