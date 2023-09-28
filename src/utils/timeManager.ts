import moment from "moment"

export const getNow = (): string => {
    const now = moment()
    return now.format('YYYY-MM-DD HH:mm:ss')
}