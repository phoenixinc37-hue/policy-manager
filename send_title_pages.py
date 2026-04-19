import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

files = [
    ('/Users/scottwilde/.openclaw/workspace/context/vet-inc-title-page-editable.html', 'vet-inc-title-page-editable.html', 'text/html'),
    ('/Users/scottwilde/.openclaw/workspace/context/vet-inc-title-page-editable.docx', 'vet-inc-title-page-editable.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
    ('/Users/scottwilde/.openclaw/workspace/context/vet-inc-title-page-blank-editable.html', 'vet-inc-title-page-blank-editable.html', 'text/html'),
    ('/Users/scottwilde/.openclaw/workspace/context/vet-inc-title-page-blank-editable.docx', 'vet-inc-title-page-blank-editable.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
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

Attached are the editable title pages based on the PDF cover style:

1. vet-inc-title-page-editable
   - populated to match the sample title page layout
2. vet-inc-title-page-blank-editable
   - same layout, blank reusable version

I included both HTML and DOCX versions so you can use whichever opens best on the Dell.

Best,
Kate
"""

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Editable Vet INC Title Pages',
    text=body,
    attachments=attachments
)
print('Sent successfully:', response)
