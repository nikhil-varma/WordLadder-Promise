/**
 *
 * @param {string} source
 * @param {string} target
 * This function will determine if two words are similar and have only one letter change
 */
const isNextNode = (source, target) => {
  if (source === target) return false;
  let letterChanges = 0;
  [...source].forEach((c, i) => {
    if (target[i] !== c) {
      letterChanges++;
    }
  });
  return letterChanges > 1 ? false : true;
};
/**
 * This method will generate the whole graph map for each item in the array
 * @param {Array<string>} wordList
 */
const generateNodeSet = wordList => {
  const words = [...wordList];
  const graph = {};
  words.forEach((w, i) => {
    let j = i;
    graph[w] = [];
    while (j < words.length) {
      if (isNextNode(w, words[j])) {
        graph[w].push(words[j]);
      }
      j++;
    }
    if (!graph[w].length) delete graph[w];
  });
  return graph;
};

var findLadders = (beginWord, endWord, wordList) => {
  /**
   * Initial conditions to avoid unnecessary processing
   */
  if (wordList.indexOf(endWord) === -1) {
    return [];
  }
  if (beginWord === endWord) {
    return [beginWord];
  }
  if (!beginWord || !endWord) {
    return [];
  }

  /**
   * Get the first adjacent node and use that as the starting point to traverse the graph.
   */
  const firstAdjacent = wordList.filter(c => isNextNode(beginWord, c));
  const graph = generateNodeSet(wordList);
  let paths = [];
  let finalPath = [];

  /**
   * This is a recursive method to get the path traversed in the graph. T
   * @param {string} beginWord
   * @param {string} endWord
   * @param {Array<string>} wordList
   */
  const getTraversedPath = (beginWord, endWord, wordList) => {
    if (!graph[beginWord]) return;
    graph[beginWord].forEach(i => {
      if (graph[beginWord].indexOf(endWord) !== -1) {
        finalPath.push(paths);
        paths = [];
      } else {
        paths.push(i);
      }
      if (i === endWord) {
        finalPath.push(paths);
        paths = [];
      }
      getTraversedPath(i, endWord, wordList);
    });
  };

  getTraversedPath(firstAdjacent, endWord, wordList);

  /**
   * Final array sanatization
   */
  return Array.from(
    new Set(finalPath.filter(i => i.length).map(JSON.stringify)),
    JSON.parse
  ).map(i => [beginWord, ...firstAdjacent, ...i, endWord]);
};
