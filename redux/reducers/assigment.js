const assigmentsDefaultState = {
  assigment: [],
};

export default (state = assigmentsDefaultState, action) => {
  let data = action.data;

  switch (action.type) {
    case "ASSIGNMMENT_SUBMIT":
      return {
        ...state,
        assigment: [...state.assigment, data],
      };

    default:
      return state;
  }
};
