## 🧑‍🎨 Teste para Vaga de Front-end na Blocks

#### ⏱️ O teste tem duração maxima de 1 hora

## 📝 Objetivo do teste

Queremos avaliar como você se desempenha desenvolvendo a solução, vamos avaliar bastante decisões, arquitetura do código e se você está fazendo um código limpo.

#### O objetivo principal do teste será realizar um CRUD de um Todo List.

### ？ Como vai funcionar o teste?

O avaliador irá enviar uma sala no meet apresentando todo o teste e explicando como configurar; quando o projeto estiver configurado e rodando o avaliador irá cronometrar 1 hora de teste até o fim do teste.

### 🚀 Rodando o Backend no Projeto

Irá rodar o json server na porta 3000.

```bash
yarn server # ou npm run server
```

#### 📑 Rotas do JSON Server

GET http://\*:3000/tarefas

GET http://\*:3000/tarefas/{id}

POST http://\*:3000/tarefas

DELETE http://\*:3000/tarefas/{id}

PUT http://\*:3000/tarefas/{id}

PATCH http://\*:3000/tarefas

#### ➡️ Body de uma tarefa para [POST/PUT]:

```js
{
      "nome": "Tarefa",
      "done": false,
      "createdAt": 1712761572
}
```

#### ✅ Body de resposta GET

```js
{
      "id": 1,
      "nome": "Tarefa",
      "done": false,
      "createdAt": 1712761572
}
```

### ❗️ Regras

- Todos os campos exceto o ID deve ser mostrado no Front-end; o campo CreatedAt está sendo retornado como Unix Time Stamp você precisa converter.

- Não será aceito ChatGPT ou Google no Geral; apenas será aceito documentações das libs/linguagem utilizada.

- Tempo maximo 1 hora

## ➡️ Tudo será levado em consideração para ganhar pontos conosco.
