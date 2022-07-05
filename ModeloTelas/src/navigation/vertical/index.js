import { Mail, Home, Star } from 'react-feather'

export default [
{ id: 'STAR',
title: 'Programa Star',
children:
[
  {
    id: 'STA',
    title: 'TimeSheet',
    navLink: '/StarTimesheet'   
  },
  {
    id: 'STA_AusenciaFuncionario',
    title: 'Ausência',
    navlink: '/AusenciaFunc'
  },
  {
    id: 'STA_CorrecaoAtendimento',
    title: 'Correção ATs',
    navlink: '/CorrecaoAT'
  }
]
},
{ id: 'CLI',
title: 'Clientes',
children:
[
  {
    id: 'CLI_LGPD',
    title: 'Cliente LGPD',
    navLink: '/LGPD'   
  }
]
}
]