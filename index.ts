import { SkillBuilders } from 'ask-sdk-core'

exports.handler = SkillBuilders
    .custom()
    .addRequestHandlers(
        new LaunchIntentRequestHandler,
        new TrueIntentRequestHandler,
        new FalseIntentRequestHandler,
        new StopIntentRequestHandler
    )
    .lambda()