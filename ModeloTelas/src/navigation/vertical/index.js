import { Mail, Home, Star } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    id: 'STA',
    title: 'Prog. Star',
    icon: <Star size={20} />,
    navLink: '/StarTimesheet'   
  }
]
