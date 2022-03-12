const generateMessage = (text: string) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};

const generateMessages = (texts: string[]): { text: string; createdAt: number }[] => {
  return texts.map(text => ({
    text,
    createdAt: new Date().getTime(),
  }));
};

const generateLocationMessage = (username, url) => {
  return {
    username,
    url,
    createdAt: new Date().getTime(),
  };
};
export { generateMessage, generateLocationMessage, generateMessages };
