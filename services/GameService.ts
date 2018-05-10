import * as TrueQuotes from '../data/TrueQuotes'
import * as FalseQuotes from '../data/FalseQuotes'
import { AttributesManager } from 'ask-sdk-core';

export default class GameService {
    private attributesManager: AttributesManager

    constructor (attributesManager: AttributesManager) {
        this.attributesManager = attributesManager
    }

    public getQuote (): string {
        // Should we grab a true or a false?
        const decision = !!Math.round(Math.random())
        const quote = decision ? this.getRandomTrueQuote() : this.getRandomFalseQuote()

        this.storeQuestion(quote, decision)

        return quote
    }

    private storeQuestion (quote: string, answer: boolean): void {
        this.attributesManager.setSessionAttributes({
            lastQuestion: quote,
            answer: answer
        })
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