import { GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE, POST_DATA, POST_DATA_SUCCESS, POST_DATA_FAILURE } from '../../actions';

const initialState = {
  items: [],
  status: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, result, error } = action;
  switch (type) {
    case GET_DATA:
      return state;
    case GET_DATA_SUCCESS:
      return { ...state, status: 200, items: result };
    case GET_DATA_FAILURE:
      return { ...state, status: 500, error };
    case POST_DATA:
      return state;
    case POST_DATA_SUCCESS:
      return { ...state, status: 200, data: result };
    case POST_DATA_FAILURE:
      return { ...state, status: 500, error };
    default:
      return state;
  }
}