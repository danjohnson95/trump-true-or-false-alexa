import { SkillBuilders } from 'ask-sdk-core'
import LaunchIntentRequestHandler from './handlers/LaunchIntentRequestHandler'
import TrueIntentRequestHandler from './handlers/TrueIntentRequestHandler'
import FalseIntentRequestHandler from './handlers/FalseIntentRequestHandler'
import StopIntentRequestHandler from './handlers/StopIntentRequestHandler'
import RepeatIntentRequestHandler from './handlers/RepeatIntentRequestHandler'
import HelpIntentRequestHandler from './handlers/HelpIntentRequestHandler'

exports.handler = SkillBuilders
    .custom()
    .addRequestHandlers(
        new LaunchIntentRequestHandler,
        new TrueIntentRequestHandler,
        new FalseIntentRequestHandler,
        new RepeatIntentRequestHandler,
        new StopIntentRequestHandler,
        new HelpIntentRequestHandler
    )
    .lambda()