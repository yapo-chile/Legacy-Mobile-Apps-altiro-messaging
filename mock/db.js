module.exports = function() {
  return {
    block: require('./api/block.json'),
    messages: require('./api/messages.json'),
    conversations: require('./api/conversations.json'),
    conversation: require('./api/conversation.json'),
    images: require('./api/images.json'),
    configurations: require('./api/configurations.json'),
    ads: require('./api/ads.json'),
  }
}