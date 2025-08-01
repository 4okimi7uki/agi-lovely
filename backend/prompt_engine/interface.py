from typing import List, Dict


class LLMClient:
    def generate(self, messages: List[Dict]) -> str:
        raise NotImplementedError
