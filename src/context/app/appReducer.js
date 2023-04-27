const appReducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default appReducer;
