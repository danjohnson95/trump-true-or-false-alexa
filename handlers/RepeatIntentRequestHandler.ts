import { Response } from 'ask-sdk-model'
import { RequestHandler, HandlerInput } from 'ask-sdk-core'
import GameService from '../services/GameService'

export default class RepeatIntentRequestHandler implements RequestHandler {
    canHandle (handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request

        return request.type === 'IntentRequest' && request.intent.name === 'RepeatIntent'
    }

    handle (handlerInput: HandlerInput): Response {
        const gameService = new GameService(handlerInput.attributesManager)
        const lastQuestion = gameService.repeatQuestion()

        return handlerInput.responseBuilder
            .speak(lastQuestion)
            .reprompt(lastQuestion)
            .getResponse()
    }
}