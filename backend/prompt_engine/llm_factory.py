from prompt_engine.llm_clients.openai_client import OpenAIClient
from prompt_engine.llm_clients.gemini_client import GeminiClient
from prompt_engine.interface import LLMClient


def load_llm(provider: str) -> LLMClient:
    if provider == "gemini":
        return GeminiClient()
    # elif provider == "openai":
    #     return OpenAIClient()
    else:
        raise ValueError(f"Unknown LLM provider: {provider}")
