-- ASTRO BONK BOMBS — Supabase Schema
-- Applied via `apply_migration` on project vvyzlyxxhwnyasgoaxlq

-- ============================================================================
-- Tables
-- ============================================================================

CREATE TABLE public.leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL CHECK (char_length(player_name) BETWEEN 1 AND 20),
  distance integer NOT NULL CHECK (distance >= 0),
  world_reached integer NOT NULL DEFAULT 1 CHECK (world_reached BETWEEN 1 AND 10),
  sparks_collected integer NOT NULL DEFAULT 0 CHECK (sparks_collected >= 0),
  gems_collected integer NOT NULL DEFAULT 0 CHECK (gems_collected >= 0),
  best_combo integer NOT NULL DEFAULT 0 CHECK (best_combo >= 0),
  skin text NOT NULL DEFAULT 'classic',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX leaderboard_distance_idx ON public.leaderboard (distance DESC);
CREATE INDEX leaderboard_world_idx ON public.leaderboard (world_reached DESC, distance DESC);
CREATE INDEX leaderboard_created_idx ON public.leaderboard (created_at DESC);

CREATE TABLE public.player_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text UNIQUE NOT NULL CHECK (char_length(player_name) BETWEEN 1 AND 20),
  total_distance bigint NOT NULL DEFAULT 0,
  total_runs integer NOT NULL DEFAULT 0,
  total_sparks bigint NOT NULL DEFAULT 0,
  total_gems integer NOT NULL DEFAULT 0,
  max_world integer NOT NULL DEFAULT 1,
  total_stomps integer NOT NULL DEFAULT 0,
  total_bonks integer NOT NULL DEFAULT 0,
  achievements jsonb NOT NULL DEFAULT '{}'::jsonb,
  owned_skins text[] NOT NULL DEFAULT ARRAY['classic']::text[],
  equipped_skin text NOT NULL DEFAULT 'classic',
  upgrades jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.daily_missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day date NOT NULL UNIQUE,
  missions jsonb NOT NULL,
  reward_sparks integer NOT NULL DEFAULT 50,
  reward_gems integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- Triggers
-- ============================================================================

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER player_stats_touch
BEFORE UPDATE ON public.player_stats
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============================================================================
-- RLS Policies
-- ============================================================================

ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read leaderboard"
  ON public.leaderboard FOR SELECT USING (true);

CREATE POLICY "Anyone can insert score"
  ON public.leaderboard FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read missions"
  ON public.daily_missions FOR SELECT USING (true);

CREATE POLICY "Anyone can read player_stats"
  ON public.player_stats FOR SELECT USING (true);

CREATE POLICY "Anyone can upsert own stats by name"
  ON public.player_stats FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update own stats by name"
  ON public.player_stats FOR UPDATE USING (true);
