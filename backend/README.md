# 💸 Gestão de Finanças Pessoais

## 💡 Apresentação do projeto
Uma das minhas maiores dores ao controlar as minhas finanças pessoais era encontrar uma solução que se encaixasse ao meu perfil, sempre esbarrando em soluções que tinham mais informações do que preciso ou menos informações que preciso, então buscando solucionar essa lacuna resolvi desenvolver uma API RESTful para suprir essa necessidade e para tanto a construí com Java e Spring Boot que são tecnologias que tenho maior conhecimento.

## 🎯 Objetivo
O objetivo desta aplicação é fornecer uma solução para gerenciar finanças pessoais de maneira prática e facilitada, para atender a esse propósito teremos as seguintes funcionalidades.

- Registrar receitas (ex: salário)
- Registrar despesas (ex: aluguel, água, luz, telefone,...)
- Listar todos os registros de receitas e despesas
- Consultar exclusivamente um único registro
- Atualizar um registro
- Remover um registro

## 🛠️ Tecnologias Utilizadas
Para o desenvolvimento desta aplicação, foram adotadas as seguintes tecnologias:

- **☕ Java 21** : Linguagem robusta, segura e moderna - utilizaremos a versão LTS mais recente.

- **🚀 Spring Boot** - Framework consolidado no ecossistema Java, facilita o desenvolvimento de APIs com alta produtividade.

- **🐘 PostgreSQL** - Banco de dados relacional performático, ideal para armazenar dados estruturados de forma segura.

- **🧩 JPA / Hibernate** - Framework ORM para mapeamento objeto-relacional, abstraindo operações com o banco de dados.

- **🔄 MapStruct** - Gerador de mapeamentos automáticos entre entidades e DTOs, garantindo performance e legibilidade no código.

- **✅ Bean Validation (Jakarta Validation)** - Validação automática dos dados recebidos pela API.

- **🔧 Lombok** - Biblioteca para reduzir código repetitivo, como getters, setters e construtores.

- **📘 Springdoc OpenAPI (Swagger)** - Geração automática de documentação interativa da API.

- **🐳 Docker** - Containerização da aplicação e do banco de dados para facilitar testes, desenvolvimento e deploy.

## 🚀 Como executar o projeto com Docker
> Pré-requisitos: [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

1. Clone o repositório:

```bash
git clone https://github.com/fabiokusaba/myfinance.git
cd myfinance/backend
```

2. Suba os containers com:

```bash
docker-compose up --build
```

3. Acesse a documentação da API em:
- http://localhost:8080/swagger-ui/index.html#/