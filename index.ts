import { SkillBuilders } from 'ask-sdk-core'
import RepeatIntentRequestHandler from './handlers/RepeatIntentRequestHandler'

exports.handler = SkillBuilders
    .custom()
    .addRequestHandlers(
        new LaunchIntentRequestHandler,
        new TrueIntentRequestHandler,
        new FalseIntentRequestHandler,
        new RepeatIntentRequestHandler,
        new StopIntentRequestHandler
    )
    .lambda()