import { createClient } from '@supabase/supabase-js'
import { Community } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const CommunityService = {
  async createCommunity(community: Omit<Community, 'id'>): Promise<Community> {
    const { data, error } = await supabase
      .from('communities')
      .insert(community)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getCommunities(userId: string): Promise<Community[]> {
    const { data, error } = await supabase
      .from('community_members')
      .select('community_id')
      .eq('user_id', userId)

    if (error) throw error

    const communityIds = data.map(item => item.community_id)

    const { data: communities, error: communitiesError } = await supabase
      .from('communities')
      .select('*')
      .in('id', communityIds)

    if (communitiesError) throw communitiesError
    return communities
  },

  async getPublicCommunities(): Promise<Community[]> {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('isPublic', true)

    if (error) throw error
    return data
  },

  async joinCommunity(userId: string, communityId: string): Promise<void> {
    const { error } = await supabase
      .from('community_members')
      .insert({ user_id: userId, community_id: communityId })

    if (error) throw error

    // Update member count
    await supabase.rpc('increment_member_count', { community_id: communityId })
  },

  async leaveCommunity(userId: string, communityId: string): Promise<void> {
    const { error } = await supabase
      .from('community_members')
      .delete()
      .eq('user_id', userId)
      .eq('community_id', communityId)

    if (error) throw error

    // Update member count
    await supabase.rpc('decrement_member_count', { community_id: communityId })
  }
}

