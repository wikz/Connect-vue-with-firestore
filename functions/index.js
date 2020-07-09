const functions = require('firebase-functions');

exports.completionCalculator = functions.firestore.document('users/user1')
  .onWrite((change, context) => {
    const document = change.after.exists ? change.after.data() : null;
    if (!document) { return null; }

    const keys = Object.keys(document);
    let count = 0;
    let oldPercentage = 0;
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== 'completion' && document[keys[i]] !== '') {
        count++;
      }
    }

    if (change.before.exists) {
      const oldData = change.before.data();
      oldPercentage = oldData.completion;
    }

	// to minimize database writing
    const percent = (count / (keys.length - 1) * 100);
    if (percent === oldPercentage) { return null; }

    // Then return a promise of a set operation to update the completion
    return change.after.ref.set({
      completion: percent
    }, { merge: true });
  });