import { Response } from 'ask-sdk-model'
import { RequestHandler, HandlerInput } from 'ask-sdk-core'
import GameService from '../services/GameService';

export default class TrueIntentRequestHandler implements RequestHandler {
    canHandle (handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request

        return request.type === 'IntentRequest' && request.intent.name === 'TrueIntent'
    }

    handle (handlerInput: HandlerInput): Response {
        const gameService = new GameService(handlerInput.attributesManager)
        const correct = gameService.checkAnswer(true)
        const response = correct ? this.getCorrectResponse() : this.getIncorrectResponse()

        if (gameService.shouldEndGame()) {
            const correctAnswerCount = gameService.getCorrectCount()

            return handlerInput.responseBuilder
                .speak(response + 'That\'s the end of the game. You got ' + correctAnswerCount + ' out of 5.')
                .getResponse()
        }

        const nextQuestion = gameService.getQuote()

        return handlerInput.responseBuilder
            .speak(response + ' Next quote: ' + nextQuestion)
            .reprompt(nextQuestion)
            .getResponse()       
    }

    getCorrectResponse (): string {
        return 'Correct!'
    }

    getIncorrectResponse (): string {
        return 'Incorrect.'
    }
}