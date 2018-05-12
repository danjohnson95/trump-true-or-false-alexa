import * as TrueQuotes from '../data/TrueQuotes.json'
import * as FalseQuotes from '../data/FalseQuotes.json'
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

    public checkAnswer (answer: boolean): boolean {
        const session = this.attributesManager.getSessionAttributes()

        if (!session) {
            throw new Error('No question has been asked yet!')
        }

        return session.answer === answer
    }

    public repeatQuestion (): string {
        const session = this.attributesManager.getSessionAttributes()

        if (!session) {
            throw new Error('No question has been asked yet!')
        }

        return session.lastQuestion
    }

    private storeQuestion (quote: string, answer: boolean): void {
        this.attributesManager.setSessionAttributes({
            lastQuestion: quote,
            answer: answer
        })
    }

    private getRandomTrueQuote (): string {
        const index = this.getRandomIndex(<any>TrueQuotes)

        return TrueQuotes[index]
    }

    private getRandomFalseQuote (): string {
        const index = this.getRandomIndex(<any>FalseQuotes)

        return FalseQuotes[index]
    }

    private getRandomIndex (object: string[]): number {
        return Math.floor(Math.random() * object.length)
    }
}