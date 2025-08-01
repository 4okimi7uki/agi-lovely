from dotenv import load_dotenv
import os
import google.generativeai as genai
from typing import List, Dict
from prompt_engine.interface import LLMClient

# .envからAPIキー読み込み
BASE_DIR = os.path.dirname(os.path.dirname(__file__))  # → prompt_engine/
DOTENV_PATH = os.path.join(BASE_DIR, "local.env")

print(DOTENV_PATH)

load_dotenv(dotenv_path=DOTENV_PATH, override=True)
api_key = os.getenv("GEMINI_API_KEY")

# Gemini初期化
genai.configure(api_key=api_key)


class GeminiClient(LLMClient):
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-1.5-flash")
        self.chat = self.model.start_chat(history=[])

    def generate(self, messages: List[Dict]) -> str:
        response = self.chat.send_message(messages)
        return response.text
