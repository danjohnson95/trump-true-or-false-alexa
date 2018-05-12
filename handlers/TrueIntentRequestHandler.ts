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
            
    }
}