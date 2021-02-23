# Adonis API application

## Passos para Executar

adonis migration:refresh -> limpa a base e roda as migrations novamente

adonis seed -> roda os seeds


## Passos para Iniciar

adonis new [nome_app] --api-only

### Model + Controller + Migration

adonis make:model Project -m -c  -> -m já cria a migration -c já cria o controller

### Controller

adonis make:controller Role

### Seed

adonis make:seed

### Middleware

adonis make:middleware Team

### Hook

Hook observa mudança no model e dispara uma ação quando ela ocorre. Ex: manda email qnd invite é criado.

adonis make:hook Invite

### Envio de email

yarn add adonis-kue

const providers = [
  ...
  'adonis-kue/providers/KueProvider'
]

const aceProviders = [
  ...
  'adonis-kue/providers/CommandsProvider'
]

const jobs = [
  ...
  'App/Jobs/InvitationEmail'
]

### Job

adonis make:job InvitationEmail

module.exports = { providers, aceProviders, aliases, commands, jobs }


config/kue.js
'use strict'

const Env = use('Env')

module.exports = {
  // redis connection
  connection: Env.get('KUE_CONNECTION', 'kue')
}

adonis install @adonisjs/redis

const providers = [
  '@adonisjs/redis/providers/RedisProvider'
]

###  Validator

adonis install @adonisjs/validator
adonis make:validator User
adonis make:validator Team
adonis make:validator Session
adonis make:validator Project
adonis make:validator Invite

Verificar os providers para conter o dos validators

### Autorização

yarn add adonis-acl

app.js :
{
    Verificar os providers para conter o de autorização

    providers 
    'adonis-acl/providers/AclProvider',
    aceProviders 
    'adonis-acl/providers/CommandsProvider',

    Verificar os aliases
    {
        Role: 'Adonis/Acl/Role',
        Permission: 'Adonis/Acl/Permission',
    }

}

Alterar a classe que conterá as permissoes para ter o seguinte método
{
  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }
}

Alterar os namedMiddlewares para ter o is e can
{
  is: 'Adonis/Acl/Is',
  can: 'Adonis/Acl/Can',
}


adonis acl:setup