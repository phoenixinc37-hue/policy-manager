import os
import base64
from dotenv import load_dotenv
from agentmail import AgentMail, SendAttachment

def send_pricing_directive():
    load_dotenv('/Users/scottwilde/.openclaw/workspace/.env')
    client = AgentMail(api_key=os.getenv('AGENTMAIL_API_KEY'))
    
    html_content = """
    <html>
    <head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1, h2 { color: #2c3e50; }
        .memo-header { border-bottom: 2px solid #2c3e50; padding-bottom: 10px; margin-bottom: 20px; }
        .alert { background-color: #fff3cd; color: #856404; padding: 15px; border-left: 4px solid #ffeeba; margin-bottom: 20px; }
    </style>
    </head>
    <body>
        <div class="memo-header">
            <h1>Directive: Phase 1 Inflationary Uplift Initiative</h1>
            <p><strong>To:</strong> Dawn, Penny</p>
            <p><strong>From:</strong> Scott Wilde</p>
            <p><strong>Date:</strong> April 21, 2026</p>
            <p><strong>Subject:</strong> Immediate Pricing Adjustments (TG & RV)</p>
        </div>

        <div class="alert">
            <strong>Action Required:</strong> Please update the attached service codes in the practice management software by end of day Friday. These are maintenance adjustments required to align with cumulative inflation.
        </div>

        <h2>Tudor Glen (TG)</h2>
        <p>Attached file: <em>Tudor_Glen_Price_Change_April_2026_1_2.docx</em> (251 Codes)</p>

        <h2>River Valley (RV)</h2>
        <p>Attached file: <em>RV_Pricing_Report_March2026_2.xlsx</em> (161 Codes)</p>

        <p>Please confirm via reply once these updates are live in the system.</p>
        <p>Thanks,<br>Scott</p>
    </body>
    </html>
    """

    atts = []
    
    # Attach TG docx
    with open('/Users/scottwilde/.openclaw/workspace/context/s1-500-day-plan/05-pricing-pat/moonbuilder-source-3/Tudor_Glen_Price_Change_April_2026_1_2---a1c2c2cd-345f-4ecd-a912-0f9d70b58538.docx', 'rb') as f:
        tg_b64 = base64.b64encode(f.read()).decode('utf-8')
        atts.append(SendAttachment(
            filename="Tudor_Glen_Price_Change_April_2026.docx",
            content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            content=tg_b64,
            content_disposition="attachment"
        ))

    # Attach RV xlsx
    with open('/Users/scottwilde/.openclaw/workspace/context/s1-500-day-plan/05-pricing-pat/moonbuilder-source-3/RV_Pricing_Report_March2026_2---a97879eb-9167-4fef-b5fa-1a07d6d80ee8.xlsx', 'rb') as f:
        rv_b64 = base64.b64encode(f.read()).decode('utf-8')
        atts.append(SendAttachment(
            filename="RV_Pricing_Report_March2026.xlsx",
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            content=rv_b64,
            content_disposition="attachment"
        ))

    try:
        response = client.inboxes.messages.send(
            inbox_id="goliasphoenix@agentmail.to",
            to=["Scott-Wilde@live.com"],
            subject="[Draft] Directive: Phase 1 Inflationary Uplift Initiative",
            html=html_content,
            attachments=atts
        )
        print(f"Success! Sent drafting package to Scott-Wilde@live.com")
        print(response)
    except Exception as e:
        print(f"Error sending email: {e}")

if __name__ == "__main__":
    send_pricing_directive()