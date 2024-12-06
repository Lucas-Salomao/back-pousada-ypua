```mermaid
graph TD
    A[Início] --> B[Usuário acessa a página de login];
    B --> C[Usuário insere email e senha];
    C --> D[Sistema busca usuário pelo email no banco de dados];
    D -- Usuário encontrado --> E[Sistema compara a senha inserida com a senha armazenada];
    D -- Usuário não encontrado --> F["Sistema exibe mensagem (Usuário não encontrado)"];
    F --> G["Fim (Login falhou)"];
    E -- Senha correta --> H[Sistema gera token JWT];
    H --> I[Sistema retorna o token para o usuário];
    I --> J[Sistema redireciona o usuário para a área autenticada];
    J --> K["Fim (Login bem-sucedido)"];
    E -- Senha incorreta --> L["Sistema exibe mensagem "Senha incorreta""];
    L --> G;
```
