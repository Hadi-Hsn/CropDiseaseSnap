const buildAction = (type, payload) => {
  return {
    type: type,
    payload: payload
  };
};

export default buildAction;
