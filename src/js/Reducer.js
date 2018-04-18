const cleanParams = params => ({
  year: parseInt(params.year),
  month: params.month ? parseInt(params.month) : 1,
});

const reducer = (state, action) => {
  const getStateWithNewParams = params => ({ ...state, params: cleanParams(params) });
  switch (action.type) {
  case "UPDATEPARAMS":
    return getStateWithNewParams(action.params);
  case "SETMONTH":
    return getStateWithNewParams({year: state.params.year, month: action.month});
  case "SETYEAR":
    return getStateWithNewParams({month: state.params.month, year: action.year});
  default:
    return state;
  }
};

export default reducer;