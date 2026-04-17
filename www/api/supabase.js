// Supabase client helper for ASTRO BONK BOMBS
// Loaded via ESM CDN — no build step required

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Public, safe to expose — RLS policies control access
export const SUPABASE_URL = 'https://vvyzlyxxhwnyasgoaxlq.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_aYa5S1rVCN7ofdwnt6dQkw_9Sv5cZrr';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================================
//  LEADERBOARD
// ============================================================================

/**
 * Submit a score after a run ends.
 * @param {object} run - { player_name, distance, world_reached, sparks_collected, gems_collected, best_combo, skin }
 */
export async function submitScore(run){
  const { data, error } = await supabase
    .from('leaderboard')
    .insert(run)
    .select()
    .single();
  if(error) console.warn('submitScore failed', error);
  return { data, error };
}

/**
 * Get top N scores (by distance, descending).
 */
export async function getTopScores(limit = 10){
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('distance', { ascending: false })
    .limit(limit);
  if(error) console.warn('getTopScores failed', error);
  return { data: data || [], error };
}

/**
 * Get scores for a specific world.
 */
export async function getWorldScores(world, limit = 10){
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .gte('world_reached', world)
    .order('distance', { ascending: false })
    .limit(limit);
  return { data: data || [], error };
}

// ============================================================================
//  PLAYER STATS
// ============================================================================

/**
 * Upsert player aggregate stats after a run.
 */
export async function updatePlayerStats(name, stats){
  const { data, error } = await supabase
    .from('player_stats')
    .upsert({
      player_name: name,
      ...stats,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'player_name' })
    .select()
    .single();
  if(error) console.warn('updatePlayerStats failed', error);
  return { data, error };
}

/**
 * Fetch a player's stats by name.
 */
export async function getPlayerStats(name){
  const { data, error } = await supabase
    .from('player_stats')
    .select('*')
    .eq('player_name', name)
    .maybeSingle();
  return { data, error };
}

// ============================================================================
//  DAILY MISSIONS
// ============================================================================

export async function getTodayMissions(){
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from('daily_missions')
    .select('*')
    .eq('day', today)
    .maybeSingle();
  return { data, error };
}
