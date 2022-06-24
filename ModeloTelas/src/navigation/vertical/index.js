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
    id: 'STA_AuaenciaFuncionario',
    title: 'Ausência',
    navlink: '/AusenciaFunc'
  },
  {
    id: 'STA_CorrecaoAtendimento',
    title: 'Correção ATs',
    navlink: '/CorrecaoAT'
  }
]
}
]