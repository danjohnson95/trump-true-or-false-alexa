import * as TrueQuotes from '../data/TrueQuotes'
import * as FalseQuotes from '../data/FalseQuotes'

export default class GameService {
    private sessionData: any

    constructor (sessionData: any) {
        this.sessionData = sessionData
    }

    getQuote (): string {
        // Should we grab a true or a false?
        const answer = !!Math.round(Math.random())

        return answer ? this.getRandomTrueQuote() : this.getRandomFalseQuote()
    }

    private getRandomTrueQuote (): string {
        const index = this.getRandomIndex(TrueQuotes)

        return TrueQuotes[index]
    }

    private getRandomFalseQuote (): string {
        const index = this.getRandomIndex(FalseQuotes)

        return FalseQuotes[index]
    }

    private getRandomIndex (object: string[]): number {
        return Math.floor(Math.random() * object.length)
    }
}