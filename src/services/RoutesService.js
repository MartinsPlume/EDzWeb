import StudentHome from '../components/Student/StudentHome'
import StudentExercises from '../components/Student/StudentExercises'
import TeacherHome from '../components/Teacher/TeacherHome'
import TeacherExercises from '../components/Teacher/TeacherExercises'
import AdministratorHome from '../components/Administrator/AdministratorHome'

export const RoutesService = (userRole) =>{
    let routes;

    switch ( userRole ) {
        case 'Student':
            routes = [
                {
                  title: ' Home',
                  key: 'home',
                  link: '/',
                  icon: 'nc-icon nc-globe',
                  component: StudentHome
                },
                {
                  title: ' Exercises',
                  key: 'exercises',
                  link: '/exercises',
                  icon: 'nc-icon nc-tile-56',
                  component: StudentExercises
                }
              ]
              break;
              case 'Teacher':
            routes = [
                {
                  title: ' Home',
                  key: 'home',
                  link: '/',
                  icon: 'nc-icon nc-globe',
                  component: TeacherHome
                },
                {
                  title: ' Exercises',
                  key: 'exercises',
                  link: '/exercises',
                  icon: 'nc-icon nc-tile-56',
                  component: TeacherExercises
                }
              ]
              break;
            default:
                routes=[]
                break;
    }

    return routes
}