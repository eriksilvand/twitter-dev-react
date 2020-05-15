const limit = [
    { limit: 59, nameS: 'second', nameP: 'seconds' },
    { limit: 59, nameS: 'minute', nameP: 'minutes' },
    { limit: 23, nameS: 'hour', nameP: 'hours' },
    { limit: 29, nameS: 'day', nameP: 'days' },
    { limit: 11, nameS: 'month', nameP: 'months' },
    { limit: 0, nameS: 'year', nameP: 'years' }
]

/*
    Função responsável por exibir de forma amigavel a diferença de tempo 
    entre a postagem e a data atual
*/
const dateToStr = (arr: Array<any>, value: number, count: number = 0): string => {
    const valueRound = Math.round(value) || 1;
    if (count === arr.length) {
        return `${valueRound} ${arr?.[count - 1]?.[valueRound > 1 ? 'nameP' : 'nameS']} ago`;
    }

    return (value >= (arr[count].limit + 1))
        ? dateToStr(arr, value / (arr[count].limit + 1), count + 1)
        : `${valueRound} ${arr?.[count]?.[valueRound > 1 ? 'nameP' : 'nameS']} ago`;
}

export const compareTime: Function = (date: Date): string => {
    return dateToStr(limit, ((new Date().getTime() - date.getTime()) / 1000));
} 