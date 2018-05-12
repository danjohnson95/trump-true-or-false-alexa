import { Response } from 'ask-sdk-model'
import { RequestHandler, HandlerInput } from 'ask-sdk-core'

export default class FalseIntentRequestHandler implements RequestHandler {
    canHandle (handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent'
    }

    handle (handlerInput: HandlerInput): Response {

    }
}