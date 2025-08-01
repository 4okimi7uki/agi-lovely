#!/usr/bin/env bash
set -eu -o pipefail

# --- Install mysql-client
sudo apt update
sudo apt install -y postgresql-client vim tig gh

echo "postgresql-client installed successfully"

# --- setup prefix ---
set -e

# 1. ~/.vimrc の用意
if [ ! -f "$HOME/.vimrc" ]; then
    echo "Creating .vimrc..."
    touch "$HOME/.vimrc"
fi

# 2. ~/.vim/dict ディレクトリの用意
DICT_DIR="$HOME/.vim/dict"
mkdir -p "$DICT_DIR"

# 3. gitcommit_prefix.dict を用意
DICT_FILE="$DICT_DIR/gitcommit_prefix.dict"
if [ ! -f "$DICT_FILE" ]; then
    echo "Creating gitcommit_prefix.dict..."
    cat <<EOF > "$DICT_FILE"
fix:
feat:
refactor:
test:
style:
chore:
docs:
perf:
wip:
Merge:
EOF
fi

# 4. .vimrc に設定を追加（重複防止）
if ! grep -q "gitcommit_prefix.dict" "$HOME/.vimrc"; then
    echo "Appending dictionary setting to .vimrc..."
    cat <<EOF >> "$HOME/.vimrc"

set dictionary+=$DICT_FILE
set complete+=k
set iskeyword+=:
EOF
fi

echo "------------------------ "
echo "--- Setup completed! --- "
echo "------------------------ "