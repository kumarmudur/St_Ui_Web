export const save = (id, data) => {
  let payload = { id: id, data: data };
  localStorage.setItem(id, JSON.stringify(payload));
};

export const deleteLocalData = id => {
localStorage.removeItem(id);
};

export const remove = (id, cb) => {
  return (dispatch) => {
      localStorage.removeItem(id);
      dispatch(cb({
          error: 0,
          message: 'data removed'
      }));
  };
};

export const load = (id, cb) => {
  return (dispatch) => {
      let payload = { id: id };
      payload.data = JSON.parse(localStorage.getItem(id));
      dispatch(cb(payload.data));
  };
};

export const loadData = id => {
  return JSON.parse(localStorage.getItem(id));
};

