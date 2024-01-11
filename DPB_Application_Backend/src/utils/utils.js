// Helper function to count matching words or characters in a string
function countMatchingWords(str1, str2) {
  const words1 = str1.split(/\s+/);
  const words2 = str2.split(/\s+/);

  const commonWords = words1.filter((word1) =>
    words2.some((word2) => word1.includes(word2.slice(0, 3)))
  );
  return commonWords.length;
}

// Helper function to calculate likes-to-dislike ratio
function calculateLikesToDislikeRatio(likes, dislikes) {
  return dislikes === 0 ? likes : likes / dislikes;
}

module.exports = {
  countMatchingWords,
  calculateLikesToDislikeRatio,
};
