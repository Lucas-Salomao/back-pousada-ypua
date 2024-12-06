```mermaid
graph TD
    A[Início] --> B[Usuário acessa a página de criação de reservas];
    B --> C[Usuário seleciona a acomodação, datas e quantidade de hóspedes];
    C --> D[Sistema verifica a disponibilidade da acomodação para o período selecionado];
    D -- Acomodação disponível --> E[Usuário insere os dados dos hóspedes];
    D -- Acomodação indisponível --> F["Sistema exibe mensagem "Acomodação indisponível para o período selecionado""];
    F --> B;
    E --> G[Sistema calcula o valor total da reserva];
    G --> H[Usuário confirma os dados da reserva];
    H --> I[Sistema gera um código único para a reserva];
    I --> J[Sistema salva a reserva no banco de dados];
    J -- Sucesso --> K["Sistema exibe mensagem de sucesso "Reserva criada com sucesso Código: código""];
    K --> L["Fim (Reserva criada com sucesso)"];
    J -- Erro ao salvar --> M[Sistema exibe mensagem de erro no banco de dados];
    M --> B;
```