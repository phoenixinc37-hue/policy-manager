import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

files = [
    ('/Users/scottwilde/.openclaw/workspace/context/nathan-price-uplift-briefing-note.html', 'nathan-price-uplift-briefing-note.html', 'text/html'),
    ('/Users/scottwilde/.openclaw/workspace/context/justin-price-uplift-recap-note.html', 'justin-price-uplift-recap-note.html', 'text/html'),
    ('/Users/scottwilde/.openclaw/workspace/context/nathan-price-uplift-briefing-note.docx', 'nathan-price-uplift-briefing-note.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
    ('/Users/scottwilde/.openclaw/workspace/context/justin-price-uplift-recap-note.docx', 'justin-price-uplift-recap-note.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
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

Attached are the two pricing notes for Nathan/Justin in both HTML and DOCX formats:

1. Nathan briefing note
2. Justin recap note

I included HTML copies as a fallback in case Word formatting behaves better from the Dell that way.

Best,
Kate
"""

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Nathan and Justin Pricing Notes',
    text=body,
    attachments=attachments
)
print('Sent successfully:', response)
