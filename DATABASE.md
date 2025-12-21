# Banco de Dados Germinah - Status e Documentação

## Status Atual
O banco de dados foi criado e está **100% funcional e pronto para uso!**

## Estrutura Criada

### 1. Tabelas Principais

#### `profiles`
Perfis de usuário vinculados à autenticação
- `id`: UUID (referência para auth.users)
- `name`: Nome completo do usuário
- `created_at`: Data de criação
- `updated_at`: Última atualização

#### `plants`
Plantas cadastradas pelos usuários
- `id`: UUID único
- `user_id`: Dono da planta
- `name`: Nome da planta (ex: "Manjericão")
- `type`: Tipo (ex: "Erva aromática", "Folhosa", "Fruto")
- `min_humidity`: Umidade mínima desejada (20-80%)
- `max_humidity`: Umidade máxima desejada (40-90%)
- `image_emoji`: Emoji da planta (padrão: 🌱)
- `status`: Status atual (healthy, needs-water, overwatered)
- `created_at`: Data de cadastro
- `updated_at`: Última atualização

#### `sensor_readings`
Leituras dos sensores de umidade e temperatura
- `id`: UUID único
- `plant_id`: Planta relacionada
- `humidity`: Umidade do solo (0-100%)
- `temperature`: Temperatura em °C (-10 a 60°C)
- `recorded_at`: Momento da leitura

#### `irrigation_history`
Histórico de irrigações realizadas
- `id`: UUID único
- `plant_id`: Planta irrigada
- `duration`: Duração em segundos (1-300s)
- `mode`: Modo (automatic, manual)
- `humidity_before`: Umidade antes da irrigação
- `humidity_after`: Umidade depois (opcional)
- `irrigated_at`: Momento da irrigação

#### `user_settings`
Configurações personalizadas de cada usuário
- `id`: UUID único
- `user_id`: Usuário (único)
- `auto_irrigation`: Irrigação automática ativa (padrão: true)
- `min_humidity`: Umidade mínima global (padrão: 40%)
- `max_humidity`: Umidade máxima global (padrão: 70%)
- `check_interval`: Intervalo de verificação em minutos (padrão: 30)
- `irrigation_duration`: Duração padrão em segundos (padrão: 30)
- `notifications_email`: Notificações por email (padrão: true)
- `notifications_push`: Notificações push (padrão: true)
- `timezone`: Fuso horário (padrão: America/Sao_Paulo)
- `language`: Idioma (padrão: pt-BR)

### 2. Segurança (RLS)

**Todas as tabelas têm Row Level Security habilitado!**

#### Políticas Implementadas:
- **profiles**: Usuários veem e editam apenas seu próprio perfil
- **plants**: Usuários gerenciam apenas suas próprias plantas
- **sensor_readings**: Usuários veem apenas leituras de suas plantas
- **irrigation_history**: Usuários veem apenas irrigações de suas plantas
- **user_settings**: Usuários gerenciam apenas suas próprias configurações

### 3. Automação (Triggers)

#### Criação Automática de Dados:
1. **Perfil automático**: Quando um usuário se registra, um perfil é criado automaticamente
2. **Configurações padrão**: Quando um perfil é criado, configurações padrão são geradas
3. **Atualização de timestamps**: Campo `updated_at` é atualizado automaticamente

### 4. Views Úteis

#### `latest_sensor_readings`
Retorna a última leitura de cada planta

#### `user_plant_stats`
Estatísticas de plantas por usuário:
- Total de plantas
- Plantas saudáveis
- Plantas que precisam de água
- Plantas com excesso de água

## Como Usar

### 1. Registro de Usuário
Ao criar uma conta, automaticamente são criados:
- Perfil do usuário
- Configurações padrão

### 2. Adicionar Plantas
```sql
INSERT INTO plants (user_id, name, type, min_humidity, max_humidity)
VALUES (auth.uid(), 'Manjericão', 'Erva aromática', 40, 70);
```

### 3. Registrar Leituras de Sensores
```sql
INSERT INTO sensor_readings (plant_id, humidity, temperature)
VALUES ('plant-uuid', 65.5, 24.0);
```

### 4. Registrar Irrigação
```sql
INSERT INTO irrigation_history (plant_id, duration, mode, humidity_before)
VALUES ('plant-uuid', 30, 'manual', 48.0);
```

### 5. Atualizar Configurações
```sql
UPDATE user_settings
SET auto_irrigation = true, min_humidity = 45
WHERE user_id = auth.uid();
```

## Variáveis de Ambiente

Configuradas em `.env`:
- `VITE_SUPABASE_URL`: URL do projeto Supabase
- `VITE_SUPABASE_ANON_KEY`: Chave pública (anon key)

## Próximos Passos

O sistema está pronto para:
1. Criar usuários e fazer login
2. Cadastrar plantas
3. Registrar leituras de sensores
4. Controlar irrigações
5. Personalizar configurações

Tudo está protegido com RLS e pronto para produção!
