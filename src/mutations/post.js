const camelcaseKeys = require('camelcase-keys');

const mutateReactions = (reactions) => reactions.summary.totalCount;

const mutateComment = (comment) => ({
  id: comment.id,
  message: comment.message,
  reactions: mutateReactions(comment.reactions),
  date: comment.createdTime,
});

const mutate = (post) => {
  const mutatedPost = camelcaseKeys(post, { deep: true });
  mutatedPost.reactions = mutateReactions(mutatedPost.reactions);
  mutatedPost.comments = mutatedPost.comments ? mutatedPost.comments.data : [];
  mutatedPost.comments = mutatedPost.comments.map(mutateComment);

  return {
    id: mutatedPost.id,
    date: mutatedPost.createdTime,
    message: mutatedPost.message,
    reactions: mutatedPost.reactions,
    comments: mutatedPost.comments,
  };
};

const mutateList = (posts) => posts.map(mutate);

module.exports = {
  mutate,
  mutateList,
};
