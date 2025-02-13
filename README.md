# Teste Dinheirow - Engenheiro de Software Pleno

# Henrique Vieira Cavalcante

## Como rodar ?
 - Para facilitar sua vida na correção iremos utilizar o docker!
 - Renomeie o .env.example para .env
 - Apenas rode um ```docker-compose up -d```, que automaticamente subirá um container com a api e o banco de dados postgres :D
 - As migrations e seeds serão geradas automaticamente :)
 - Por padrão rodará em modo produção (prod)
    - para rodar em modo dev ( com o watch ) basta ir em '.env' e alterar o NODE_ENV=dev) e rodar novamente o ```docker-compose up -d```

## Tecnologias utilizadas
 - Nodejs 
 - Express
 - Yup 
 - Prisma ORM
 - Jest

## Testes ?
 - Sim!, implementei testes unitários
 - Acabei não colocando os de integração por conta que meu tempo estava muito corrido, mas pretendo adicionar :)
 - Por questões de contexto, rode os testes dentro do container :)
 - Criei alguns scripts para orientá-lo ao rodar os testes
   ```bash
    npm run test # => roda todos os testes
    npm run test:unit # => apenas roda os testes unitários
    npm run test:integration # => apenas roda os testes de integração
    npm run test:ci # => roda os testes e mostra o coverage de código testado
   ```
  
 - Com apenas os unitários garantimos 100% de coverage!
 ![](./docs/coverage_testing.png)

## Diagrama do banco de dados
- Busquei arquitetar o banco de maneira a não ter tantos problemas com repetição dos dados
  - Tentei normalizar as tabelas ao máximo
  - ![diagrama-banco-de-dados](./src/infra/db/prisma/ERD.svg)

## Quais as funcionalidades ?
 - Endpoints públicos 
   - /api/pokemons e /api/pokemons/id (GET)
 - Cadastro de usuários
   - /api/users (POST)
 - Rota de autenticação
   - /api/auth (POST)
 - Rotas privadas: (necessário autenticação)
   - /api/users/pokemons (POST) => adiciona pokemons na lista de favoritos
   - /api/users/pokemons (GET) => retorna a lista de pokemons favoritos do usuário
   - /api/users/pokemons (DELETE) => recebe uma lista de pokemons para remover da lista de favoritos

## Sobre as rotas
- Rota /api/pokemons (get)
   ```
   # Recebe os seguintes filtros na query da requisição
      - page, limit => responsáveis na paginação => (Obrigatórios!)
      - name => nome do pokemon => ('pikachu')
      - type => tipo do pokemon => ('fire', 'normal'...)
      - evolutionStage => estágio de evolução do pokemon => (1, 2...)
      - evolved => pokemon já no último estágio de evolução? (true, false)
      - familyId => pesquisa os pokemons pela família => (1, 2...)
      - wather => pesquisa pokemons pelo clima da região onde se encontram => ('Rainy', 'Sunny'...)
   ```

- Rota /api/pokemons/id
   ```
   # Recebe o parâmetro id
    - Caso seja enviado um id inválido retornará 400 com uma mensagem de id inválido
    - Semelhante ao /pokemons, mas retorna apenas um pokemon
   ```
- Rota /api/users

   ```
   # Recebe no body: username, email, password
    - Caso seja enviado dados inválidos terá um retorno 400 com os erros
    - Regras de negócio infrigidas como email e username já existentes retornarão 400 com uma mensagem
    - Cria um usuário no banco de dados, realiza o hash da senha e cria o token jwt para o usuário
    - Retorna status 200, alguns dados do usuário (email, username, id) e o token jwt 
   ```
- Rota /api/auth
  ```
  # Recebe no body: email e password
  - Caso seja enviado dados inválidos terá retorno 400 com os erros
  - Regras de negócio como email não existente e senha inválida retornarão códigos 401 com 'Invalid credentials'
  - Realiza o login do usuário, checa a senha e cria um token jwt
  - retorna status 200, alguns dados básicos do usuário e o token jwt
  ```
- Rota /api/users/pokemons (GET)
 ```
 # Recebe na query da requisição page, limit (obrigatórios) e name (opcional)
  - Caso seja enviado dados inválidos terá retorno 400 com os erros
  - Caso o usuário não esteja autenticado não conseguirá acessar a rota
  - Retorna status 200 e de forma paginada os pokemons favoritos do usuário
 ```
- Rota /api/users/pokemons (POST)
 ```
 # Recebe no body da requisição os ids dos pokemons que ele vai favoritar exm: { pokemonsIds: [1, 2, 3] }
  - Caso seja enviado dados inválidos terá retorno 400 com os erros
  - Caso o usuário não esteja autenticado não conseguirá acessar a rota
  - Retornará 201, sem nada, mas terá associado os pokemons com o usuário no banco de dados
 ```
 - Rota /api/users/pokemons (DELETE)
 ```
 # Recebe no body da requisição os ids dos pokemons que ele vai remover dos favoritos exm: { pokemonsIds: [1, 2, 3] }
  - Caso seja enviado dados inválidos terá retorno 400 com os erros
  - Caso o usuário não esteja autenticado não conseguirá acessar a rota
  - Retornará 204, sem nada, mas terá desassociado os pokemons com o usuário no banco de dados
 ```

 - Deixei um arquivo do insomnia para que você consiga realizar os testes

## Segurança
 - Para evitar ataques de DDO's blindei a API com um rate limit de 100 requisições por minuto por IP

## Sobre a escolha do Express e Prisma ORM
 - Por se tratar de uma api bem simples, optei pelo uso do express, por ser um framework não tão opinativo como o NestJs ou Adonis consigo arquitetar todo o sistema da "maneira que eu quero" e assim fica melhor para você avaliar a maneira que arquitetei.
 - Estou utilizando arquitetura limpa como um dos princípios dessa aplicação, por isso utilizando o "express" consigo encaixar bem nessa arquitetura
 - Escolhi o prisma porque:
    - Fácil manutenção
    - Migrations agilizadas
    - Fácil de fazer queries
    - Todo o banco fica centralizado, onde qualquer alteração se torna acessível

## Sobre as camadas da arquitetura
 - Domain => Se refere a camada onde está guardada as entidades e os contratos dos casos de uso da aplicação
 - Data => A camada de dados implementa os usecases do domínio e depende de alguma interface que implemente o banco de dados e outras bibliotecas necessárias caso necessite
 - Presentation => A camada de apresentação é a que conversa entre o ambiente externo e as camadas mais internas
 - Infra => Camada responsável por ter as implementações de banco de dados, serviços http com base nas bibliotecas e frameworks
 - Main => Essa é a única camada onde há acoplamento, ela é a que une todas as outras e "põe o negócio para rodar" :D

 - Utilizando uma abordagem como essa, nos proporciona um código mais escalável e refatorável e testável, imagine o caso onde será necessário trocar o ORM prisma para typeorm por exemplo, bastaria trocar as implementações na camada de infra e o resto das outras camadas nem sabem qual ORM está sendo utilizado, mantendo o mesmo código :o

## Descrição das seeds
 - Para realizar as seeds do banco, resolvi converter o arquivo xlsx para csv, por questões de praticidade, utilizei o script "convert_to_csv.sh" para realizar o download da biblioteca e converter o arquivo em csv.
 - Com o CSV em "mãos", utilizei scripts em bash com child process para adicionar os types e weather relacionados aos pokemons no banco de dados, pois eles se tornaram tabelas separadas e independentes
 - Com as tabelas types e weather criadas é hora de por a "mão na massa" e adicionar o resto dos dados dos pokemons, sobre as tabelas mais abaixo deixarei um diagrama do banco de dados com algumas explicações de porque escolhi criá-las.
 - Por mais que o arquivo csv gerado é carregável em memória no node, resolvi utilizar uma abordagem e adicionar os pokemons via stream de dados, já que se o arquivo fosse maior o node não suportaria um carregamento em memória com uma grande quantidade de dados!
 - Então com essa abordagem carregamos byte a byte do arquivo sem se preocupar com problemas de memory leak, salvando os pokemons nas tabelas do banco!