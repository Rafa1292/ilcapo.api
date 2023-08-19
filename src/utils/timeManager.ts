export const getNow = (): Date => {
    const serverTimezone = 'America/Costa_Rica'
    const now = new Date().toLocaleString('en-US', { timeZone: serverTimezone })
    return new Date(now)
}