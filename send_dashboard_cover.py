import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

files = [
    ('/Users/scottwilde/.openclaw/workspace/context/vet-inc-dashboard-cover-editable.html', 'vet-inc-dashboard-cover-editable.html', 'text/html'),
    ('/Users/scottwilde/.openclaw/workspace/context/vet-inc-dashboard-cover-editable.docx', 'vet-inc-dashboard-cover-editable.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
    ('/Users/scottwilde/.openclaw/workspace/context/vet-inc-logo-exact.png', 'vet-inc-logo-exact.png', 'image/png'),
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

Attached is the corrected dashboard title page version rebuilt as an editable file using the exact embedded logo image from the PDF:

- vet-inc-dashboard-cover-editable.html
- vet-inc-dashboard-cover-editable.docx
- vet-inc-logo-exact.png

Best,
Kate
"""

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Editable Dashboard Cover Page',
    text=body,
    attachments=attachments
)
print('Sent successfully:', response)
