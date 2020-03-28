import {SET_ADD_CLASS_SUCCESS,SET_DELETE_QUESTION_SUCCESS_NULL,SET_DELETE_QUESTION_SUCCESS,SET_QUES_DATA,SET_EXAM_DATA,SET_ADD_EXAM_ERROR,SET_ADD_EXAM_SUCCESS,SET_ADMIN_LOGIN, SET_ADMIN_LOGIN_NULL,SET_ADMIN_LOGIN_ERROR, SET_ADMIN_LOGIN_SUCCESS, SET_ADMIN_LOGIN_SUCCESS_NULL, SET_ADMIN_LOGIN_ERROR_NULL, SET_LOADING, SET_ADMIN_USERNAME_ERROR, SET_ADMIN_PASSWORD_ERROR, SET_STUDENT_DATA, SET_CLASS} from '../type'


export const setLogin = () =>(dispatch)=>{
    dispatch({type:SET_ADMIN_LOGIN})
}
export const setAdminNull = () => (dispatch)=>{
    dispatch({type:SET_ADMIN_LOGIN_NULL})
}
export const addQues=(ques,examId)=>(dispatch)=>{
    console.log({examId,ques});
}
export const checkAdmin = (history) =>(dispatch)=>{
    const id = localStorage.getItem('admin')
    fetch(`http://localhost:7000/admin/check/${id}`,{
        method:'GET',

        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((d)=>{
            console.log(d);
            if(d.error === true){

                history.push('/admin')
            }
            if(d.success === true){
                history.push('/dashboard')
            }
            
        })
    })
    .catch((error)=>{
        console.log(error)
    })

}
export const checkLogin = (history) =>(dispatch)=>{
    const id = localStorage.getItem('admin')
    fetch(`http://localhost:7000/admin/check/${id}`,{
        method:'GET',

        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((d)=>{
            console.log(d);
            if(d.error === true){

                history.push('/admin')
            }
            if(d.success === true){
                
            }
            
        })
    })
    .catch((error)=>{
        console.log(error)
    })

}
export const loginAdmin = (data, history) => (dispatch) =>{
    fetch(`http://localhost:7000/admin/login`,{
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((d)=>{
            console.log(d)
            if(d.success===true){
                localStorage.setItem('admin', d.admin_id)
                history.push('/admin/exam')
            }
            if(d.userName){
                dispatch({
                    type:SET_ADMIN_USERNAME_ERROR,
                    payload:d.userName
                })
            }
            if(d.password){
                dispatch({
                    type:SET_ADMIN_PASSWORD_ERROR,
                    payload:d.password
                })
            }
            if(d.error === true){
                dispatch({
                    type:SET_ADMIN_LOGIN_ERROR,
                    payload:d.message
                })
            }
        })
    })
    .catch((error)=>{
        console.log(error)
    })
}
export const addExam = (data) => (dispatch)=>{
    fetch(`http://localhost:7000/admin/addExam`,{
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((d)=>{
            console.log(d)
            if(d.success===true){
               dispatch({type:SET_ADD_EXAM_SUCCESS}) 
            }
            if(d.title){
                dispatch({type:SET_ADD_EXAM_ERROR,
                payload:{title:d.title}})
            }
            if(d.time){
                dispatch({type:SET_ADD_EXAM_ERROR,
                payload:{time:d.time}})
            }
            if(d.marks){
                dispatch({type:SET_ADD_EXAM_ERROR,
                payload:{marks:d.marks}})
            }
            if(d.class){
                dispatch({type:SET_ADD_EXAM_ERROR,
                payload:{class:d.class}})
            }
            
        })
    })
    .catch((error)=>{
        console.log(error)
    })
}
export const examList =() =>(dispatch)=>{
    let id =localStorage.getItem("admin")
    fetch(`http://localhost:7000/admin/examList/${id}`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((d)=>{
            console.log(d);
            if(d.success){
                dispatch({type:SET_EXAM_DATA,payload:d.data})
            }
            
        })
    })
    .catch((error)=>{
        console.log(error)
    })
}
export const quesList =(id) =>(dispatch)=>{
    
    fetch(`http://localhost:7000/admin/quesList/${id}`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((d)=>{
            console.log(d);
            if(d.success){
                dispatch({type:SET_QUES_DATA,payload:d.data});
                // console.log(d.data)
            }
        })
    })
    .catch((error)=>{
        console.log(error)
    })
}
export const deleteSuccess = ()=>(dispatch)=>{
    dispatch({type:SET_DELETE_QUESTION_SUCCESS})
}
export const deleteSuccessNull=()=>(dispatch)=>{
    dispatch({type:SET_DELETE_QUESTION_SUCCESS_NULL})
}
export const studentList = () =>(dispatch)=>{
    fetch(`http://localhost:7000/admin/student/class`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((data)=>{
            console.log(data);
            if(data.success){
                dispatch({
                    type:SET_STUDENT_DATA,
                    payload:data.data
                })
            }
        })
    })
    .catch((error)=>{
        console.log(error);
    })
}
export const addClass = (data)=>(dispatch)=>{
    fetch(`http://localhost:7000/admin/student/class/add`,{
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((d)=>{
            console.log(d)
            if(d.success===true){
               dispatch({type:SET_ADD_CLASS_SUCCESS}) 
            }
        })
    })
    .catch((error)=>{
        console.log(error)
    })
}
export const classData = ()=>(dispatch)=>{
    fetch(`http://localhost:7000/admin/student/class`,{
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((d)=>{
            console.log(d);
            if(d.success){
                dispatch({type:SET_CLASS,payload:d.data})
            }
            
        })
    })
    .catch((error)=>{
        console.log(error)
    })
}