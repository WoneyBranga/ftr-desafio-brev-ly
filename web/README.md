## Funcionalidades e Regras - frontend

Assim como na API, temos as seguintes funcionalidades e regras:

- [ ]  Deve ser possível criar um link
    - [ ]  Não deve ser possível criar um link com encurtamento mal formatado
    - [ ]  Não deve ser possível criar um link com encurtamento já existente
- [ ]  Deve ser possível deletar um link
- [ ]  Deve ser possível obter a URL original por meio do encurtamento
- [ ]  Deve ser possível listar todas as URL’s cadastradas
- [ ]  Deve ser possível incrementar a quantidade de acessos de um link
- [ ]  Deve ser possível baixar um CSV com o relatório dos links criados

Além disso, também temos algumas regras importantes específicas para o front-end:

- [ ]  É obrigatória a criação de uma aplicação React no formato SPA utilizando o Vite como `bundler`;
- [ ]  Siga o mais fielmente possível o layout do Figma;
- [ ]  Trabalhe com elementos que tragam uma boa experiência ao usuário (`empty state`, ícones de carregamento, bloqueio de ações a depender do estado da aplicação);
- [ ]  Foco na responsividade: essa aplicação deve ter um bom uso tanto em desktops quanto em celulares.

## Páginas

Essa aplicação possui 3 páginas:

- A página raiz (`/`) que exibe o formulário de cadastro e a listagem dos links cadastrados;
- A página de redirecionamento (`/:url-encurtada`) que busca o valor dinâmico da URL e faz a pesquisa na API por aquela URL encurtada;
- A página de recurso não encontrado (qualquer página que não seguir o padrão acima) que é exibida caso o usuário digite o endereço errado ou a url encurtada informada não exista.

## Dicas

- Comece o projeto pela aba `Style Guide` no Figma. Dessa forma, você prepara todo o seu tema, fontes e componentes e quando for criar as páginas vai ser bem mais tranquilo;
- Trabalhe com o desenvolvimento `mobile first`, principalmente se estiver utilizando ferramentas que se favorecem disso como Tailwind;
- Assim com a experiência do usuário é importante (UX), a sua experiência no desenvolvimento (DX) também é muito importante. Por isso, apesar de ser possível criar essa aplicação sem nenhuma biblioteca, recomendamos utilizar algumas bibliotecas que vão facilitar tanto o desenvolvimento inicial quanto a manutenção do código;
- Em caso de dúvidas, utilize o espaço da comunidade e do nosso fórum para interagir com outros alunos/instrutores e encontrar uma solução que funcione para você.

## Quer ir além?

Se você quer se desafiar e explorar conceitos além do que foram propostos no desafio, temos algumas ideias em mente para te inspirar:

⚠️ A correção do seu desafio é apenas levando em conta as regras e funcionalidades obrigatórias mencionadas nas etapas anteriores. Portanto, envie o seu código para correção antes de implementar novas funcionalidades (ou crie uma nova `branch` com o seu código alterado)

- SPA → SSR: Em vez de criar sua aplicação utilizando o Vite, que tal explorar o poder da renderização do lado do servidor e utilizar o SSR? Você pode tanto trabalhar com o Next.js quanto simplesmente utilizar o React Router como um framework (Remix) em vez de um simples router.
- Metadados: Esse tipo de aplicação se favorece muito de alguns metadados, e um bem interessante que não exploramos foram os relacionados ao protocolo OpenGraph. Seria interessante que no formulário de cadastro, também fossem informados dados como descrição do link e imagem de preview que pudessem ser utilizadas nesses metadados.
- Upload de imagem: Utilizando o ponto anterior como base, o upload de imagens para o protocolo OpenGraph pode ser bem interessante.
- Interface otimista: Um ponto que pode trazer uma boa experiência nesse tipo de aplicação é trabalhar com interface otimista. Já exibir o link na interface como se tivesse ocorrido com sucesso o cadastro na API e, caso dê algum erro, fazer o `rollback`.