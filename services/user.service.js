import { supabase } from './supabase.js'

export async function listUsersRanking() {
    try {
        const { data: users, error } = await supabase
            .from('profiles')
            .select(`
                id,
                name,
                totalSafeCarbon
            `)
            .eq('isActive', true)
            .order('totalSafeCarbon', { ascending: false })

        if (error) {
            throw new Error(`Erro ao buscar ranking: ${error.message}`)
        }

        return users
    } catch (error) {
        throw new Error(`Erro ao buscar ranking: ${error.message}`)
    }
}

export async function getUserProfile(userId) {
    try {
        const { data: user, error } = await supabase
            .from('profiles')
            .select(`
                id,
                name,
                email,
                totalPoints,
                currentPoints,
                totalSafeCarbon,
                isActive,
                created_at
            `)
            .eq('id', userId)
            .single()

        if (error) {
            throw new Error(`Erro ao buscar perfil: ${error.message}`)
        }

        return user
    } catch (error) {
        throw new Error(`Erro ao buscar perfil: ${error.message}`)
    }
}

export async function updateUserName(userId, newName) {
    try {
        const { data: updatedUser, error } = await supabase
            .from('profiles')
            .update({
                name: newName,
                updated_at: new Date().toISOString()
            })
            .eq('id', userId)
            .select(`
                id,
                name,
                email,
                totalPoints,
                currentPoints,
                totalSafeCarbon
            `)
            .single()

        if (error) {
            throw new Error(`Erro ao atualizar nome: ${error.message}`)
        }

        return updatedUser
    } catch (error) {
        throw new Error(`Erro ao atualizar nome: ${error.message}`)
    }
}

