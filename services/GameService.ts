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

    public shouldEndGame (): boolean {
        const session = this.attributesManager.getSessionAttributes()
        const count = session.count || 0

        return count > 5
    }

    public getCorrectCount (): number {
        const session = this.attributesManager.getSessionAttributes()

        return session.score
    }

    public checkAnswer (answer: boolean): boolean {
        const session = this.attributesManager.getSessionAttributes()

        if (!session) {
            throw new Error('No question has been asked yet!')
        }

        const outcome = session.answer === answer

        if (outcome) {
            session.score += 1
        }

        this.attributesManager.setSessionAttributes(session)

        return outcome
    }

    public repeatQuestion (): string {
        const session = this.attributesManager.getSessionAttributes()

        if (!session) {
            throw new Error('No question has been asked yet!')
        }

        return session.lastQuestion
    }

    private storeQuestion (quote: string, answer: boolean): void {
        const current = this.attributesManager.getSessionAttributes()
        let count = current.count || 0
        let score = current.score || 0

        this.attributesManager.setSessionAttributes({
            lastQuestion: quote,
            answer: answer,
            count: count += 1,
            score: score
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