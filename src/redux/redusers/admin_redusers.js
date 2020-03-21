import { SET_EXAM_DATA,SET_ADD_EXAM_ERROR, SET_ADD_EXAM_SUCCESS, SET_ADMIN_LOGIN_NULL, SET_ADMIN_LOGIN, SET_ADMIN_LOGIN_SUCCESS, SET_ADMIN_LOGIN_ERROR, SET_LOADING, SET_ADMIN_LOGIN_SUCCESS_NULL, SET_ADMIN_LOGIN_ERROR_NULL, SET_ADMIN_PASSWORD_ERROR, SET_ADMIN_USERNAME_ERROR, SET_QUES_DATA } from '../type'

const initialState = {
    loading: false,
    loginSuccess: null,
    loginError: null,
    userNameError: null,
    passwordError: null,
    login: false,
    addExamSuccess: null,
    addExamError: {},
    examData:null
}

export default function (state = initialState, actions) {
    switch (actions.type) {
        case SET_QUES_DATA:
            return{
                ...state,
                quesData:actions.payload
            }
        case SET_EXAM_DATA:
            return{
                ...state,
                examData:actions.payload
            }
        case SET_ADD_EXAM_SUCCESS:
            return{
                ...state,
                addExamSuccess:true,
                addExamError:""
            }
        case SET_ADD_EXAM_ERROR:
            return{
                ...state,
                addExamError:actions.payload,
            }
        case SET_ADMIN_LOGIN_NULL:
            return {
                ...state,
                login: false
            }
        case SET_ADMIN_LOGIN:
            return {
                ...state,
                login: true
            }
        case SET_ADMIN_USERNAME_ERROR:
            return {
                ...state,
                userNameError: actions.payload
            }
        case SET_ADMIN_PASSWORD_ERROR:
            return {
                ...state,
                passwordError: actions.payload
            }
        case SET_ADMIN_LOGIN_ERROR_NULL:
            return {
                ...state,
                loginError: null
            };
        case SET_ADMIN_LOGIN_SUCCESS_NULL:
            return {
                ...state,
                loginSuccess: null
            };
        case SET_ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                loginSuccess: true,
                passwordError: null,
                userNameError: null,
                loginError: null
            }
        case SET_ADMIN_LOGIN_ERROR:
            return {
                ...state,
                loginError: actions.payload
            }
        default:
            return state

    }
}