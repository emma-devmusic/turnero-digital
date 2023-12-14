import { createBrowserRouter } from 'react-router-dom';
import { App } from '../App.tsx'
import { ErrorPage } from '../components/ErrorPage.tsx';
import { Login } from '../views/Login.tsx';
import { Register } from '../views/Register.tsx';
import { Turnero } from '../views/Turnero.tsx';
import { StepOne } from '../views/StepOne.tsx';
import { StepTwo } from '../views/StepTwo.tsx';
import { StepThree } from '../views/StepThree.tsx';
import { StepResume } from '../views/StepResume.tsx';
import { Profile } from '../views/Profile.tsx';
import { Journal } from '../views/Journal.tsx';
import { Panel } from '../views/Panel.tsx';

export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'turnero',
          element: <Turnero />,
          children: [
            {
              path: 'step-one',
              element: <StepOne/>
            },
            {
              path: 'step-two',
              element: <StepTwo/>
            },
            {
              path: 'step-three',
              element: <StepThree/>  
            },
            {
              path: 'step-resume',
              element: <StepResume />
            },
            {
              path: 'profile',
              element: <Profile />
            },
            {
              path: 'journal',
              element: <Journal />
            },
            {
              path: 'panel',
              element: <Panel />
            },
          ]
        }
      ]
    }
  ])