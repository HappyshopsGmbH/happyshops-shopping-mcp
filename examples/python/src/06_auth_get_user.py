import json
import os
from client import McpSseClient, env

def main():
    email = env("DEMO_EMAIL", "user@example.com")
    code = os.getenv("DEMO_CODE")
    auth_key = os.getenv("DEMO_AUTH_KEY")

    c = McpSseClient(env("MCP_BASE_URL"))

    if not code and not auth_key:
        print("Step 1: request one-time code (valid ~10 minutes)")
        step1 = c.call_tool("getAuthKey", {"email": email})
        print(json.dumps(step1, indent=2))
        print("\nNow set DEMO_CODE in .env and rerun this script.")
        return

    if not auth_key and code:
        print("Step 2: exchange code for authKey")
        step2 = c.call_tool("getAuthKey", {"email": email, "code": code})
        print(json.dumps(step2, indent=2))
        print("\nNow set DEMO_AUTH_KEY from the response and rerun to call getUser.")
        return

    print("Fetching user data with authKey")
    user_res = c.call_tool("getUser", {"email": email, "authKey": auth_key})
    print(json.dumps(user_res, indent=2))

if __name__ == "__main__":
    main()
