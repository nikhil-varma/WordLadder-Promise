const f = firstName => {
  return new Promise((resolve, reject) => {
    if (!firstName) {
      return reject('firstName is required');
    }
    const fullName = `${firstName} Smith`;
    resolve(fullName);
  });
};


/* Usage */
f('SomeName').then(res => console.log(res)).catch(err => console.log(err))
f().then(res => console.log(res)).catch(err => console.log(err))
