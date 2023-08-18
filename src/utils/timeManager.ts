export const getNow = (): Date => {
    const serverTimezone = 'America/Costa_Rica'
    const now = new Date().toLocaleString('es-ES', { timeZone: serverTimezone })
    return new Date(now)
}