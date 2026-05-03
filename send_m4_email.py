import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

body = '''From: Leanne Weintz <leanne@realty-one.ca>
Sent: April 22, 2026, 9:00 AM
To: Scott Wilde - Suite 609 <scott-wilde@live.com>
Subject: April rental statement

Hello Scott,

I hope you are doing well. Here is your April rental statement.

Have a great day,

Leanne Weintz
Realty One Real Estate Ltd.
Licensed Property Manager
Real Estate Agent - REALTOR®
Text or Cell: 250-864-2242
1332 Water Street
'''

pdf_path = "/Users/scottwilde/.openclaw/workspace/tmp-609-654-Cook-Rd-Apr26.pdf"

# Download attachment once from known URL and attach it
import urllib.request
url = "https://cdn.agentmail.to/attachments/be951372-31a6-48ee-b73e-d8925bed8a02?Expires=1776890137&Key-Pair-Id=KEP2XXZ8TNG4T&Signature=EyMEMTEMkcATTioAydqs3XJcnDNZ7WFNtuvrPqiXIPrJd08MCS~WJGixlNKZ16Q6umSc5xhmADSS-I1qbTnhlZ09DNWHdcUC2XFAZDGYC6m0CMncNzgFs~2agRRNTW1-9SWRSf5TMMkwdDbx5RxnZW5JWVeeOXxno84qV8aI9ZXdbHfNy5B~LOGbMxdseM1JtGLXNGft5s28vuOyvftFx2tp9M9QE-flPfu9FAjUlWob6Cl2B3l9m1e~~2QFFBhFs3rIGEEX37UOqsE0ISu7xHlTNpIz0bn2uNpehzQQsLyOitiPdTJ4U9YbhX3qlqMM6Ci1cZmoL7Dv6TEeTMwLRw__"
urllib.request.urlretrieve(url, pdf_path)

with open(pdf_path, 'rb') as f:
    b64_content = base64.b64encode(f.read()).decode('utf-8')

attachment = SendAttachment(
    filename="609-654 Cook Rd - Apr'26.pdf",
    content_type="application/pdf",
    content=b64_content,
    content_disposition="attachment"
)

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject='Fwd: April rental statement',
    text=body,
    attachments=[attachment]
)
print(response)
