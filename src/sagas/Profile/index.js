import { takeLatest } from 'redux-saga/effects';
import * as action from '../../actions/profile';
import postChangePasswordSaga from './postChangePasswordSaga';
import postEditProfileSaga from './postEditProfileSaga';
import postImageUploadSaga from './postImageUploadSaga';


// watcher saga: watches for actions dispatched to the store, starts worker saga
function* watcherSaga() {
    yield takeLatest(action.POST_CHANGE_PASSWORD, postChangePasswordSaga);
    yield takeLatest(action.POST_EDIT_PROFILE, postEditProfileSaga);
    yield takeLatest(action.POST_PROFILE_IMAGE_UPLOAD, postImageUploadSaga);
}

const ProfileSagas = [ watcherSaga() ];
export default ProfileSagas;
