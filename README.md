<h1 style="text-align: center;">MesaCerta</h1>
<p align="center">
  <img src="https://i.imgur.com/pH57SOM.png" alt="Imagem" />
</p>

<h3>Equipe:   
   <a href = "https://github.com/allefbcc">Állef Robson</a> |
   <a href = "https://github.com/Claudierio">Claudierio Baltazar</a> |
   <a href = "https://github.com/Dev-Henrique-Almeida">Henrique de Almeida</a>
</h3>

<h1>Sobre o Projeto:</h1>

<h4>Projeto para implementação de um sistema em TypeScript, JavaScript e SCSS para a disciplina de Projeto de Desenvolvimento ministrado pelo Professor Dr. <a href = "https://github.com/rgcrochaa">Rodrigo Rocha</a>, da UFAPE, referente ao período de 2024.2 com intuito de avaliação para a disciplina. O projeto MesaCerta é a solução perfeita para quem deseja unir praticidade e experiências gastronômicas de qualidade. Com ele, você pode avaliar restaurantes e pratos, compartilhando suas opiniões para ajudar outros usuários a fazerem as melhores escolhas. Além disso, o sistema permite consultar avaliações confiáveis de outros clientes, garantindo que você sempre encontre o lugar ideal para sua refeição.

Outra funcionalidade essencial é a possibilidade de **agendar horários** de forma rápida e prática, eliminando qualquer complicação na hora de reservar sua mesa. Seja para um **almoço casual, um jantar especial ou uma experiência culinária única**, o **MesaCerta** conecta você aos melhores restaurantes, otimizando seu tempo e garantindo que cada momento seja perfeito. **MesaCerta: Seu lugar, seu sabor, na hora certa!** 🚀</h4>
   
<h1>Objetivo:</h1>

   <h4> O projeto Mesa Certa tem como objetivo criar uma plataforma digital que conecte clientes e restaurantes em Garanhuns-PE, permitindo que os usuários avaliem pratos e estabelecimentos, consultem opiniões de outros clientes e realizem reservas de mesas de forma prática. Além disso, oferece aos donos de restaurantes um painel administrativo para gerenciar horários, adicionar pratos e acompanhar reservas em tempo real, promovendo a gastronomia local com inovação e eficiência.
   </h4>
   
<h1>Artefatos:</h1>
<h3><a href = "https://docs.google.com/document/d/1wjmfI1lCJ825pcwKAi9S2E5xAsYx8jPQ/edit?usp=sharing&ouid=117847122838659309163&rtpof=true&sd=true" target="_blank">Estudo de Viabilidade</a></h3>
<h3><a href = "https://docs.google.com/document/d/1XDzQPm2M0N5SbVnFRKEz85k9XyKR_8GR/edit?usp=sharing&ouid=117847122838659309163&rtpof=true&sd=true" target="_blank">TAP</a></h3>
<h3><a href = "https://www.figma.com/design/xPRDuVKrU2Z5YE3GRxhAam/Prot%C3%B3tipo-de-telas----MesaCerta?node-id=0-1&t=wHPaZlJFusEk13Di-1" target="_blank">Protótipo</a></h3>
<h3><a href = "https://drive.google.com/file/d/13P7puwTpwDumGN5UqKXGlfxSbatfSG5f/view?usp=sharing" target="_blank">MER</a></h3>
<h3><a href = "https://docs.google.com/document/d/1XA63bjzmeiI_U5UCQP7B889zrK9HhUwJ/edit?usp=sharing&ouid=117847122838659309163&rtpof=true&sd=true" target="_blank">Plano de Projeto</a></h3>
<h3><a href= "https://www.youtube.com/watch?v=lgomVGFIFY0" target="_blank">Pitch</a> </h3>
<h1>Tecnologias Usadas:</h1>


<h3><a href = "https://www.typescriptlang.org/">TypeScript</a></h3>
<ul>
   <li>Versão: 5.8.3</li>
</ul>

<h3><a href = "https://nestjs.com/">Nest.js</a></h3>
<ul>
   <li>Versão: 10.0.0</li>
</ul>

<h3><a href = "https://www.prisma.io/">Prisma ORM</a></h3>
<ul>
   <li>Versão: 5.18.0</li>
</ul>

<h3><a href = "https://www.postgresql.org/">PostgreSQL</a></h3>
<ul>
   <li>Versão: 17.4</li>
</ul>


<h1>Status do projeto:</h1>
<h4>Em Andamento</h4>

---

## 📌 Instalação

```bash
$ npm install
```

---

## 🚀 Rodando o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# gerar o sql dos models no schema
$ npx prisma generate

# criar as tabelas
$ npx prisma migrate dev
```

## 🔐 Variáveis de Ambiente `(.env)`

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/database"
JWT_SECRET=anything
```

## 🌐 Como utilizar o Insomnia

<ol>
  <li>Baixe o Insomnia em <a href="https://insomnia.rest/download" target="_blank">https://insomnia.rest/download</a>.</li>
  <li>Importe no Insomnia o arquivo localizado em: MesaCerta-API\src\storage\mesa-certa-api.txt</li>
  <li>Editar environment.</li>
  <li>Clique no token, vá em "Request" e selecione "[Users] POST Login". Salve e utilize normalmente.</li>
</ol>

