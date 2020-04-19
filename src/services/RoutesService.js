import StudentHome from '../components/Student/StudentHome'
import StudentExercises from '../components/Student/StudentExercises'
import TeacherHome from '../components/Teacher/TeacherHome'
import AdministratorHome from '../components/Administrator/AdministratorHome'

export const RoutesService = (userRole) =>{
    let routes;

    switch ( userRole ){
        case 'Student':
            routes = [
                {
                  title: 'Home',
                  key: 'home',
                  link: '/home',
                  component: StudentHome
                },
                {
                  title: 'Exercises',
                  key: 'exercises',
                  link: '/exercises',
                  component: StudentExercises
                }
              ]
              
        case 'Teacher':
            routes = [
                {
                  title: 'Home',
                  key: 'home',
                  link: '/home',
                  component: TeacherHome
                }
              ]
              break;

        case 'Administrator':
            routes = [
                {
                  title: 'Login',
                  key: 'login',
                  link: '/login',
                  component: AdministratorHome
                }
              ]
              break;
            default:
                routes=[]
                break;
    }

    return routes
}