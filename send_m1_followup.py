import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail

load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))

subject = 'M1 Follow up draft - locum requirements'
text = '''Subject: Follow up on locum requirements

Hi Dawn,

Following up on the locum item.

You had indicated that you emailed Stacy to confirm what is needed. When you receive her reply, please send me:

- what is required
- whether anything further is needed on our side
- whether there are any timing issues or restrictions

Thanks,

Scott'''

response = client.inboxes.messages.send(
    inbox_id='goliasphoenix@agentmail.to',
    to=['Scott-Wilde@live.com'],
    subject=subject,
    text=text,
)
print(response)
