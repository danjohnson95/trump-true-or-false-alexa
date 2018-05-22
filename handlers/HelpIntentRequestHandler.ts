import { Response } from 'ask-sdk-model'
import { RequestHandler, HandlerInput } from 'ask-sdk-core'
import GameService from '../services/GameService';

export default class HelpIntentRequestHandler implements RequestHandler {
    canHandle (handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent'
    }

    handle (handlerInput: HandlerInput): Response {
        return handlerInput.responseBuilder
            .speak('I\'ll say some random quotes. Respond with "true" if you think Trump said them, or "false" if you think he didn\'t. I\'ll let you know if you were correct or not, and add up your score at the end of the game')
            .getResponse()
    }
}