const defaultIndentation = 2;

const addSpace = (spaceCount) => {
  let spaceString = '';
  for (let i = spaceCount; i; i -= 1) {
    spaceString = `${spaceString} `;
  }
  return spaceString;
};

const applyEslintRules = (jsonSelected, indentationCount = defaultIndentation) => {
  let formatedResult = '';

  for (let key in jsonSelected) {
    let newKey = key;
    let newValue = jsonSelected[key];

	  if (key.includes('-')) {
      newKey = `'${key}'`;
		}

    if (typeof jsonSelected[key] !== 'number'
      && typeof jsonSelected[key] !== 'object'
    ) {
      newValue = `'${jsonSelected[key]}'`;
    } else if (typeof jsonSelected[key] === 'object') {
      const spaceCount = indentationCount + defaultIndentation;

      let newObjectHowString = '{';
      newObjectHowString = `${newObjectHowString}${applyEslintRules(jsonSelected[key], spaceCount)}`;
      newValue = `${newObjectHowString} \n${addSpace(indentationCount)}}`;
    }

    formatedResult = `${formatedResult}\n${addSpace(indentationCount)}${newKey}: ${newValue},`;
	}

  return formatedResult;
};

const jsonTransform = (textSelected) => {
  const jsonSelected = JSON.parse(textSelected);

	let newObjectHowString = `{${applyEslintRules(jsonSelected)}`;
  return `${newObjectHowString}\n}`;
};

module.exports = jsonTransform;
