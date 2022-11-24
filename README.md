# Teste Dinheirow - Engenheiro de Software Pleno

# Henrique Vieira Cavalcante

## Como rodar ?
 - Para facilitar sua vida na correção iremos utilizar o docker!
 - Apenas rode um ```docker-compose up -d```, que automaticamente subirá um container com a api e o banco de dados postgres :D
 - Antes de tudo, vá para dentro do container da api gerada
    ```bash
     docker ps # => retorna os processos rodando, selecione o id do container test_backend
     docker exec -it id_do_container sh # => lhe dá acesso ao file system do container, agora dentro do container rode os scripts abaixo!
     npm run migrate:run # => roda as migrations
     npx prisma generate # => gera a tipagem do prisma e realiza a conexão
     npm run seed # => roda as seeds!
    ```

## Tecnologias utilizadas
 - Nodejs 
 - Express
 - Yup 
 - Prisma ORM
 - Jest

## Testes ?
 - Sim!, implementei testes unitários e de integração utilizando jest!
 - Criei alguns scripts para orientá-lo ao rodar os testes
   ```bash
    npm run test # => roda todos os testes
    npm run test:unit # => apenas roda os testes unitários
    npm run test:integration # => apenas roda os testes de integração
    npm run test:ci # => roda os testes e mostra o coverage de código testado
   ```

## Quais as funcionalidades ?
 - É uma API bem simples, possui um crud de pokemons
 - Realizei a criação de vários filtros de pokemons na rota de listagem dos quais irei mencionar mais abaixo

## Sobre a escolha do framework express
 - Por se tratar de uma api bem simples, optei pelo uso do express, por ser um framework não tão opinativo como o NestJs ou Adonis consigo arquitetar todo o sistema da "maneira que eu quero" e assim fica melhor para você avaliar a maneira que arquitetei o sistema.

## Descrição das seeds
 - Para realizar as seeds do banco, resolvi converter o arquivo xlsx para csv, por questões de praticidade, utilizei o script "convert_to_csv.sh" para realizar o download da biblioteca e converter o arquivo em csv.
 - Com o CSV em "mãos", utilizei scripts em bash com child process para adicionar os types e weather relacionados aos pokemons no banco de dados, pois eles se tornaram tabelas separadas e independentes
 - Com as tabelas types e weather criadas é hora de por a "mão na massa" e adicionar o resto dos dados dos pokemons, sobre as tabelas mais abaixo deixarei um diagrama do banco de dados com algumas explicações de porque escolhi criá-las.
 - Por mais que o arquivo csv gerado é carregável em memória no node, resolvi utilizar uma abordagem e adicionar os pokemons via stream de dados, já que se o arquivo fosse maior o node não suportaria um carregamento em memória com uma grande quantidade de dados!
 - Então com essa abordagem carregamos byte a byte do arquivo sem se preocupar com problemas de memory leak, salvando os pokemons nas tabelas do banco!