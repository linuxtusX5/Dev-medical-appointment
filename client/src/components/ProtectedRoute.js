import * as React from 'react';
import { Navigate } from 'react-router-dom';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { hideLoading, showLoading } from '../redux/features/alertSlice';
// import { setUser } from '../redux/features/userSlice.jsx';

export default function ProtectedRoute({ children }) {
    // const dispatch = useDispatch();
    // const { user } = useSelector((state) => state.user);

            // dispatch(showLoading());
            if(localStorage.getItem('token')){
                return children;
            }else{
            localStorage.clear();
                return <Navigate to={'/login'}/>
      }

    // React.useEffect(() => {
    //     if(!user){
    //         getUser();
    //     }
    // }, [user, getUser]);
    // if(localStorage.getItem("token")){
    //     return children;
    // }else{
    //     // window.location.reload();
    //     return <Navigate to={'/login'}/>
    // }

  }
