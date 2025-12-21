/*
  # Schema Completo do Sistema Germinah
  
  ## Visão Geral
  Este schema cria toda a estrutura necessária para o sistema de irrigação inteligente Germinah,
  incluindo perfis de usuário, plantas, leituras de sensores, histórico de irrigação e configurações.
  
  ## 1. Novas Tabelas
  
  ### `profiles`
  - `id` (uuid, FK para auth.users) - ID do usuário
  - `name` (text) - Nome completo do usuário
  - `created_at` (timestamptz) - Data de criação
  - `updated_at` (timestamptz) - Última atualização
  
  ### `plants`
  - `id` (uuid, PK) - ID único da planta
  - `user_id` (uuid, FK para auth.users) - Dono da planta
  - `name` (text) - Nome da planta
  - `type` (text) - Tipo (erva aromática, folhosa, fruto, etc)
  - `min_humidity` (integer) - Umidade mínima desejada (%)
  - `max_humidity` (integer) - Umidade máxima desejada (%)
  - `image_emoji` (text) - Emoji representando a planta
  - `status` (text) - Status: healthy, needs-water, overwatered
  - `created_at` (timestamptz) - Data de cadastro
  - `updated_at` (timestamptz) - Última atualização
  
  ### `sensor_readings`
  - `id` (uuid, PK) - ID único da leitura
  - `plant_id` (uuid, FK para plants) - Planta relacionada
  - `humidity` (numeric) - Umidade do solo (%)
  - `temperature` (numeric) - Temperatura (°C)
  - `recorded_at` (timestamptz) - Momento da leitura
  
  ### `irrigation_history`
  - `id` (uuid, PK) - ID único do registro
  - `plant_id` (uuid, FK para plants) - Planta irrigada
  - `duration` (integer) - Duração em segundos
  - `mode` (text) - Modo: automatic, manual
  - `humidity_before` (numeric) - Umidade antes da irrigação
  - `humidity_after` (numeric) - Umidade depois (nullable)
  - `irrigated_at` (timestamptz) - Momento da irrigação
  
  ### `user_settings`
  - `id` (uuid, PK) - ID único
  - `user_id` (uuid, FK para auth.users) - Usuário
  - `auto_irrigation` (boolean) - Irrigação automática ativa
  - `min_humidity` (integer) - Umidade mínima global
  - `max_humidity` (integer) - Umidade máxima global
  - `check_interval` (integer) - Intervalo de verificação (minutos)
  - `irrigation_duration` (integer) - Duração padrão (segundos)
  - `notifications_email` (boolean) - Notificações por email
  - `notifications_push` (boolean) - Notificações push
  - `timezone` (text) - Fuso horário
  - `language` (text) - Idioma
  - `created_at` (timestamptz) - Data de criação
  - `updated_at` (timestamptz) - Última atualização
  
  ## 2. Segurança (RLS)
  - Todas as tabelas têm RLS habilitado
  - Usuários só acessam seus próprios dados
  - Políticas separadas para SELECT, INSERT, UPDATE e DELETE
  - Autenticação obrigatória para todas as operações
  
  ## 3. Índices
  - Índices em foreign keys para performance
  - Índices em campos frequentemente consultados
  
  ## 4. Triggers
  - Atualização automática de `updated_at`
  - Criação automática de perfil ao registrar usuário
  - Criação automática de configurações padrão
*/

-- =======================
-- 1. TABELA DE PERFIS
-- =======================

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE INDEX IF NOT EXISTS profiles_id_idx ON profiles(id);

-- =======================
-- 2. TABELA DE PLANTAS
-- =======================

CREATE TABLE IF NOT EXISTS plants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  min_humidity integer DEFAULT 40 NOT NULL CHECK (min_humidity >= 20 AND min_humidity <= 80),
  max_humidity integer DEFAULT 70 NOT NULL CHECK (max_humidity >= 40 AND max_humidity <= 90),
  image_emoji text DEFAULT '🌱' NOT NULL,
  status text DEFAULT 'healthy' NOT NULL CHECK (status IN ('healthy', 'needs-water', 'overwatered')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT humidity_range CHECK (max_humidity > min_humidity)
);

ALTER TABLE plants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own plants"
  ON plants FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plants"
  ON plants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plants"
  ON plants FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own plants"
  ON plants FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS plants_user_id_idx ON plants(user_id);
CREATE INDEX IF NOT EXISTS plants_status_idx ON plants(status);

-- =======================
-- 3. TABELA DE LEITURAS
-- =======================

CREATE TABLE IF NOT EXISTS sensor_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id uuid REFERENCES plants(id) ON DELETE CASCADE NOT NULL,
  humidity numeric(5,2) NOT NULL CHECK (humidity >= 0 AND humidity <= 100),
  temperature numeric(5,2) NOT NULL CHECK (temperature >= -10 AND temperature <= 60),
  recorded_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE sensor_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view readings of own plants"
  ON sensor_readings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM plants
      WHERE plants.id = sensor_readings.plant_id
      AND plants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert readings for own plants"
  ON sensor_readings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM plants
      WHERE plants.id = sensor_readings.plant_id
      AND plants.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS sensor_readings_plant_id_idx ON sensor_readings(plant_id);
CREATE INDEX IF NOT EXISTS sensor_readings_recorded_at_idx ON sensor_readings(recorded_at DESC);

-- =======================
-- 4. HISTÓRICO DE IRRIGAÇÃO
-- =======================

CREATE TABLE IF NOT EXISTS irrigation_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id uuid REFERENCES plants(id) ON DELETE CASCADE NOT NULL,
  duration integer DEFAULT 30 NOT NULL CHECK (duration > 0 AND duration <= 300),
  mode text DEFAULT 'automatic' NOT NULL CHECK (mode IN ('automatic', 'manual')),
  humidity_before numeric(5,2) CHECK (humidity_before >= 0 AND humidity_before <= 100),
  humidity_after numeric(5,2) CHECK (humidity_after >= 0 AND humidity_after <= 100),
  irrigated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE irrigation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view irrigation history of own plants"
  ON irrigation_history FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM plants
      WHERE plants.id = irrigation_history.plant_id
      AND plants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert irrigation records for own plants"
  ON irrigation_history FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM plants
      WHERE plants.id = irrigation_history.plant_id
      AND plants.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS irrigation_history_plant_id_idx ON irrigation_history(plant_id);
CREATE INDEX IF NOT EXISTS irrigation_history_irrigated_at_idx ON irrigation_history(irrigated_at DESC);

-- =======================
-- 5. CONFIGURAÇÕES DO USUÁRIO
-- =======================

CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  auto_irrigation boolean DEFAULT true NOT NULL,
  min_humidity integer DEFAULT 40 NOT NULL CHECK (min_humidity >= 20 AND min_humidity <= 80),
  max_humidity integer DEFAULT 70 NOT NULL CHECK (max_humidity >= 40 AND max_humidity <= 90),
  check_interval integer DEFAULT 30 NOT NULL CHECK (check_interval >= 5 AND check_interval <= 1440),
  irrigation_duration integer DEFAULT 30 NOT NULL CHECK (irrigation_duration >= 10 AND irrigation_duration <= 300),
  notifications_email boolean DEFAULT true NOT NULL,
  notifications_push boolean DEFAULT true NOT NULL,
  timezone text DEFAULT 'America/Sao_Paulo' NOT NULL,
  language text DEFAULT 'pt-BR' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT settings_humidity_range CHECK (max_humidity > min_humidity)
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS user_settings_user_id_idx ON user_settings(user_id);

-- =======================
-- 6. FUNCTIONS E TRIGGERS
-- =======================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plants_updated_at
  BEFORE UPDATE ON plants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil ao registrar usuário
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Função para criar configurações padrão
CREATE OR REPLACE FUNCTION create_user_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar configurações ao criar perfil
CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_user_settings();

-- =======================
-- 7. VIEWS ÚTEIS
-- =======================

-- View para obter última leitura de cada planta
CREATE OR REPLACE VIEW latest_sensor_readings AS
SELECT DISTINCT ON (plant_id)
  plant_id,
  humidity,
  temperature,
  recorded_at
FROM sensor_readings
ORDER BY plant_id, recorded_at DESC;

-- View para estatísticas de plantas por usuário
CREATE OR REPLACE VIEW user_plant_stats AS
SELECT
  p.user_id,
  COUNT(*) as total_plants,
  COUNT(*) FILTER (WHERE p.status = 'healthy') as healthy_plants,
  COUNT(*) FILTER (WHERE p.status = 'needs-water') as plants_need_water,
  COUNT(*) FILTER (WHERE p.status = 'overwatered') as overwatered_plants
FROM plants p
GROUP BY p.user_id;
