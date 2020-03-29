import {SET_ADD_CLASS_ERROR_NULL,SET_CLASS,SET_ADD_CLASS_ERROR,SET_ADD_CLASS_NULL,SET_ADD_CLASS_SUCCESS,SET_STUDENT_DATA,SET_DELETE_QUESTION_SUCCESS_NULL,SET_DELETE_QUESTION_SUCCESS,SET_ADD_QUESTION_ERROR, SET_ADD_QUESTION_ERROR_NULL, SET_EXAM_DATA,SET_ADD_EXAM_ERROR, SET_ADD_EXAM_SUCCESS, SET_ADMIN_LOGIN_NULL, SET_ADMIN_LOGIN, SET_ADMIN_LOGIN_SUCCESS, SET_ADMIN_LOGIN_ERROR, SET_LOADING, SET_ADMIN_LOGIN_SUCCESS_NULL, SET_ADMIN_LOGIN_ERROR_NULL, SET_ADMIN_PASSWORD_ERROR, SET_ADMIN_USERNAME_ERROR, SET_QUES_DATA } from '../type'

const initialState = {
    loading: false,
    loginSuccess: null,
    loginError: null,
    userNameError: null,
    passwordError: null,
    login: false,
    addExamSuccess: null,
    addExamError: {},
    examData:null,
    addQuesError:{},
    deleteQuesSuccess:false,
    studentData:null,
    addClassSuccess:false,
    classData:null,
    classAE:null,

}

export default function (state = initialState, actions) {
    switch (actions.type) {
        case SET_ADD_CLASS_ERROR_NULL:
            return{
                ...state,
                classAE:null
            }
        case SET_ADD_CLASS_ERROR:
            return{
                ...state,
                classAE:actions.payload
            }
        case SET_CLASS:
            return{
                ...state,
                classData:actions.payload
            }
        case SET_ADD_CLASS_SUCCESS:
            return{
                ...state,
                addClassSuccess:true,
                classAE:null
            }
            case SET_ADD_CLASS_NULL:
                return{
                    ...state,
                    addClassSuccess:false
                }
        case SET_DELETE_QUESTION_SUCCESS_NULL:
            return{
                ...state,
                deleteQuesSuccess:false
            }
        case SET_DELETE_QUESTION_SUCCESS:
            return{
                ...state,
                deleteQuesSuccess:true
            }
        case SET_ADD_QUESTION_ERROR:
            return{
                ...state,
                addQuesError:actions.payload
            }
        case SET_ADD_QUESTION_ERROR_NULL:
            return{
                ...state,
                addQuesError:null
            }
        case SET_QUES_DATA:
            return{
                ...state,
                quesData:actions.payload
            }
        case SET_STUDENT_DATA: return{
            ...state,
            studentData:actions.payload
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