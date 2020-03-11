const f = firstName => {
  return new Promise((resolve, reject) => {
    if (!firstName) {
      return reject('firstName is required');
    }
    const fullName = `${firstName} Smith`;
    resolve(fullName);
  });
};
