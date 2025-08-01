# llm_client.py
from dotenv import load_dotenv
import os
import openai
from typing import List, Dict
from prompt_engine.interface import LLMClient

load_dotenv(dotenv_path="../local.env", override=True)
openai.api_key = os.getenv("OPENAI_API_KEY")
# if not openai.api_key:
#     raise RuntimeError("OPENAI_API_KEY が設定されていません🥺")


class OpenAIClient(LLMClient):
    def generate(self, messages: List[Dict]) -> str:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.8,
        )
        return response.choices[0].message.content


# def generate_response(messages, model="gpt-4o", temperature=0.8):
#     response = openai.ChatCompletion.create(
#         model=model,
#         messages=messages,
#         temperature=temperature,
#     )
#     return response["choices"][0]["message"]["content"]
