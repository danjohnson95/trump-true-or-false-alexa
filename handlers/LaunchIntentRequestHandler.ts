import { Response } from 'ask-sdk-model'
import { RequestHandler, HandlerInput } from 'ask-sdk-core'
import GameService from '../services/GameService';

export default class LaunchIntentRequestHandler implements RequestHandler {
    canHandle (handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request

        return (request.type === 'IntentRequest' && request.intent.name === 'NewGameIntent') 
            || request.type === 'LaunchRequest'
    }

    handle (handlerInput: HandlerInput): Response {
        const gameService = new GameService(handlerInput.attributesManager)
        const welcomeMessage = 'Welcome. I\'m going to give you 5 quotes - some will have been said by Trump, some will not. Give me your answer by responding with "True" or "False".'
        const firstQuestion = 'Here\'s your first question:'
        const quote = gameService.getQuote()
        const constructedMessage = welcomeMessage + ' ' + firstQuestion + ' ' + quote

        return handlerInput.responseBuilder
            .speak(constructedMessage)
            .reprompt(quote)
            .getResponse()
    }
}