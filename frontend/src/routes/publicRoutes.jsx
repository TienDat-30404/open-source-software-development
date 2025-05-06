import Login from '../pages/Login/Login';
import SignUpByStepOne from '../pages/SignUp/SignUpByStepOne';
import SignUpByStepTwo from '../pages/SignUp/SignUpByStepTwo';

export const publicRoutes = [
    { path: '/login', page: Login },
    { path: '/signup/step1', page: SignUpByStepOne },
    { path: '/signup/step2', page: SignUpByStepTwo },
]; 