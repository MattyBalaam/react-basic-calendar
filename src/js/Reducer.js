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
    return getStateWithNewParams({...state.params, month: action.month});
  case "SETYEAR":
    return getStateWithNewParams({...state.params, year: action.year});
  default:
    return state;
  }
};

export default reducer;