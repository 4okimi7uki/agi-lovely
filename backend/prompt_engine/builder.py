import json
from typing import List, Dict
from prompt_engine.llm_factory import load_llm
# from prompt_engine.builder import build_prompt, load_character


def load_character(character_path: str) -> Dict:
    with open(character_path, "r", encoding="utf-8") as f:
        return json.load(f)


# def build_prompt(character: Dict, history: List[Dict], user_input: str) -> List[Dict]:
#     messages = []

#     # system prompt（人格）
#     messages.append({
#         "role": "system",
#         "content": character["system_prompt"]
#     })

#     # 会話履歴（あれば）
#     messages.extend(history)

#     # 今回の入力
#     messages.append({
#         "role": "user",
#         "content": user_input
#     })

#     return messages


def build_prompt(character: Dict, history: List[Dict], user_input: str) -> str:
    """
    Gemini向けに、プレーンテキストで会話履歴を組み立てる。
    """
    prompt_lines = []
    prompt_lines.append(character["system_prompt"])
    prompt_lines.append("")  # 改行

    for h in history:
        role = "ユーザー" if h["role"] == "user" else "アシスタント"
        prompt_lines.append(f"{role}: {h['content']}")

    prompt_lines.append(f"ユーザー: {user_input}")
    prompt_lines.append("アシスタント:")

    return "\n".join(prompt_lines)


if __name__ == "__main__":
    character = load_character("./prompt_engine/characters/lovely.json")

    history = [
        {"role": "user", "content": "最近ちょっと元気ないかも…"},
        {"role": "assistant", "content": "ええっ！？だいじょうぶ！？🥺 無理しないで、まず深呼吸しよっ✨"}
    ]

    user_input = "やる気出る言葉ちょうだい！"

    prompt = build_prompt(character, history, user_input)

    llm = load_llm("gemini")  # "openai" に切り替えたい時はここのみ
    reply = llm.generate(prompt)

    print("Lovely:", reply)
