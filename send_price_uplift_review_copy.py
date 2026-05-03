import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

files = [
    ('/Users/scottwilde/.openclaw/workspace/context/vet-inc-price-uplift-edited-review-copy.pdf', 'vet-inc-price-uplift-edited-review-copy.pdf', 'application/pdf'),
    ('/Users/scottwilde/.openclaw/workspace/context/vet-inc-price-uplift-edits-requested.md', 'vet-inc-price-uplift-edits-requested.md', 'text/markdown'),
]

attachments = []
for path, filename, content_type in files:
    with open(path, 'rb') as f:
        b64_content = base64.b64encode(f.read()).decode('utf-8')
    attachments.append(SendAttachment(
        filename=filename,
        content_type=content_type,
        content=b64_content,
        content_disposition='attachment'
    ))

body = """Hi Scott,

Attached are:

1. the full PDF review copy
2. the exact wording edits requested for the Inflationary Uplift section

Best,
Kate
"""

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Price Uplift PDF Review Copy and Requested Edits',
    text=body,
    attachments=attachments
)
print('Sent successfully:', response)
