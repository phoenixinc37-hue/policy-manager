import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

with open('/Users/scottwilde/.openclaw/workspace/policy-manager-source.zip', 'rb') as f:
    b64_content = base64.b64encode(f.read()).decode('utf-8')

attachment = SendAttachment(
    filename="policy-manager-source.zip",
    content_type="application/zip",
    content=b64_content,
    content_disposition="attachment"
)

response = client.inboxes.messages.send(
    inbox_id="goliasphoenix@agentmail.to",
    to=["Scott-Wilde@live.com", "wildejack1010@gmail.com"],
    subject="Policy Manager Source Code",
    text="Hi Scott and Jack,\n\nAttached is the cleaned-up source code for the Policy Manager website (node_modules and build files removed so it's a manageable size).\n\nBest,\nKate",
    attachments=[attachment]
)
print("Sent successfully:", response)