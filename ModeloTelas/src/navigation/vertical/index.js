export default [
{ id: 'STAR',
title: 'Programa Star',
children:
[
  {
    id: 'STA_AusenciaFuncionario',
    title: 'Ausência',
    navLink: '/AusenciaFunc'
  },
  {
    id: 'STA',
    title: 'TimeSheet',
    navLink: '/StarTimesheet'   
  },
    {
    id: 'STA_CorrecaoAtendimento',
    title: 'Correção ATs',
    navLink: '/CorrecaoAT'
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
},
{ id: 'APV',
title: 'Aprovações Pendentes',
navLink: '/AprovacoesPendentes'
}
]