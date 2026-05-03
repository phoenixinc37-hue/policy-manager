import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

with open('/Users/scottwilde/.openclaw/workspace/policy-manager-v1.zip', 'rb') as f:
    b64_content = base64.b64encode(f.read()).decode('utf-8')

attachment = SendAttachment(
    filename="policy-manager-v1.zip",
    content_type="application/zip",
    content=b64_content,
    content_disposition="attachment"
)

response = client.inboxes.messages.send(
    inbox_id="goliasphoenix@agentmail.to",
    to=["Scott-Wilde@live.com"],
    subject="[7 Summits] Policy Manager - Version 1.0 Source Backup",
    text="Scott,\n\nAttached is the locked Version 1.0 backup for the Policy Manager app. (Jack's email bounced, so I am sending this directly to you. Please forward to him if needed.)\n\nThis contains the complete front-end visual and navigation demo we just finished. I have also tagged this exactly as 'v1.0' in GitHub so we have a permanent marker in the codebase.\n\nFuture backend/database wiring will proceed as V2.\n\n- Kate",
    attachments=[attachment]
)
print("Sent successfully:", response)