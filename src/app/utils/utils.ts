const TEM = 0.029;
const EA = 0.258;

export function getQuote(amount: number, quotes: number): any {
  const MV = EA / 12;
  return amount / ((1 - Math.pow(MV + 1, -quotes)) / MV);
}
export const availableAmount = 20000000;
export const blackListedUsers = ['19385159', '70753211'];
export const whiteListedUsers = [
  {
    NumeroIdentificacion: '1026253861',
    PrimerNombre: 'Diego',
    PrimerApellido: 'Suarez',
    SegundoApellido: 'Leal',
    MontoAprobado: 10000000,
    Email: 'dsuarez@epik.com.co',
    Celular: '3006789769',
    AccountBank: 'BBVA',
    AccountNumber: '54236',
  },
  {
    NumeroIdentificacion: '80084225',
    PrimerNombre: 'Felipe',
    PrimerApellido: 'Basto',
    SegundoApellido: 'Gil',
    MontoAprobado: 10000000,
    Email: 'felipe@epik.com.co',
    Celular: '3006789769',
    AccountBank: 'Falabella',
    AccountNumber: '00171',
  },
  {
    NumeroIdentificacion: '1049622556',
    PrimerNombre: 'Danny',
    PrimerApellido: 'Viasus',
    SegundoApellido: 'Avila',
    MontoAprobado: 30000000,
    Email: 'danjavia@gmail.com',
    Celular: '3167808694',
    AccountBank: 'Bancolombia',
    AccountNumber: '98665',
  },
  {
    NumeroIdentificacion: '88158976',
    PrimerNombre: 'Paulo',
    PrimerApellido: 'Castro',
    SegundoApellido: '',
    MontoAprobado: 30000000,
    Email: 'pcastro@epik.com.co',
    Celular: '3144870644',
    AccountBank: 'Bancolombia',
    AccountNumber: '38794',
  },
  {
    NumeroIdentificacion: '1020768390',
    PrimerNombre: 'Natalia',
    PrimerApellido: 'Gomez',
    SegundoApellido: '',
    MontoAprobado: 30000000,
    Email: 'ngomez@epik.com.co',
    Celular: '3106660528',
    AccountBank: 'Itau',
    AccountNumber: '29231',
  },
  {
    NumeroIdentificacion: '1026284730',
    PrimerNombre: 'David',
    PrimerApellido: 'Barrera',
    SegundoApellido: 'Lopez',
    MontoAprobado: 30000000,
    Email: 'dbarrera@epik.com.co',
    Celular: '3112290916',
    AccountBank: 'Davivienda',
    AccountNumber: '26224',
  },
  {
    NumeroIdentificacion: '1216972253',
    PrimerNombre: 'Carlos',
    PrimerApellido: 'Mieles',
    SegundoApellido: 'Mora',
    MontoAprobado: 30000000,
    Email: 'cmieles@epik.com.co',
    Celular: '3023104472',
    AccountBank: 'Davivienda',
    AccountNumber: '02090',
  },
  {
    NumeroIdentificacion: '1015425739',
    PrimerNombre: 'Brayan',
    PrimerApellido: 'Morales',
    SegundoApellido: 'Lopez',
    MontoAprobado: 30000000,
    Email: 'nlopez@epik.com.co',
    Celular: '3183838160',
    AccountBank: 'Bancolombia',
    AccountNumber: '10778',
  },
  {
    NumeroIdentificacion: '29775057',
    PrimerNombre: 'Nataly',
    PrimerApellido: 'Lema',
    SegundoApellido: 'Becona',
    MontoAprobado: 30000000,
    Email: 'nlema@epik.com.co',
    Celular: '3184828592',
    AccountBank: 'Bancolombia',
    AccountNumber: '65078',
  },
  {
    NumeroIdentificacion: '1018483843',
    PrimerNombre: 'Juan',
    PrimerApellido: 'Motta',
    SegundoApellido: 'Sanchez',
    MontoAprobado: 30000000,
    Email: 'jmotta@epik.com.co',
    Celular: '3102001240',
    AccountBank: 'Scotiabank',
    AccountNumber: '29109',
  },
  {
    NumeroIdentificacion: '1022322576',
    PrimerNombre: 'Evelyn',
    PrimerApellido: 'Rivas',
    SegundoApellido: 'Hermosa',
    MontoAprobado: 30000000,
    Email: 'nomina@epik.com.co',
    Celular: '3143857422',
    AccountBank: 'Davivienda',
    AccountNumber: '65675',
  },
  {
    NumeroIdentificacion: '1019290116',
    PrimerNombre: 'Julian',
    PrimerApellido: 'Baquero',
    SegundoApellido: 'Cadena',
    MontoAprobado: 30000000,
    Email: 'jbaquero@epik.com.co',
    Celular: '3125579242',
    AccountBank: 'BBVA',
    AccountNumber: '87387',
  },
  {
    NumeroIdentificacion: '1019129740',
    PrimerNombre: 'Paula',
    PrimerApellido: 'Zarate',
    SegundoApellido: 'Ortega',
    MontoAprobado: 30000000,
    Email: 'pzarate@epik.com.co',
    Celular: '3212394954',
    AccountBank: 'Davivienda',
    AccountNumber: '52175',
  },
  {
    NumeroIdentificacion: '1015416593',
    PrimerNombre: 'Manuela',
    PrimerApellido: 'Ospina',
    SegundoApellido: 'Carrasquilla',
    MontoAprobado: 30000000,
    Email: 'mospina@epik.com.co',
    Celular: '3502715033',
    AccountBank: 'Bancolombia',
    AccountNumber: '63544',
  },
  {
    NumeroIdentificacion: '1077035701',
    PrimerNombre: 'David',
    PrimerApellido: 'Martinez',
    SegundoApellido: 'Quito',
    MontoAprobado: 30000000,
    Email: 'soporte@epik.com.co',
    Celular: '3143355769',
    AccountBank: 'Davivienda',
    AccountNumber: '60311',
  },
  {
    NumeroIdentificacion: '1020717140',
    PrimerNombre: 'Melissa',
    PrimerApellido: 'Robinson',
    SegundoApellido: 'Ortiz',
    MontoAprobado: 30000000,
    Email: 'mrobinson@epik.com.co',
    Celular: '3107950001',
    AccountBank: 'Falabella',
    AccountNumber: '17008',
  },
  {
    NumeroIdentificacion: '79789361',
    PrimerNombre: 'Carlos',
    PrimerApellido: 'Torres',
    SegundoApellido: '',
    MontoAprobado: 30000000,
    Email: 'ctorres@epik.com.co',
    Celular: '3118768585',
    AccountBank: 'Bancolombia',
    AccountNumber: '64979',
  },
  {
    NumeroIdentificacion: '75955274',
    PrimerNombre: 'Refael',
    PrimerApellido: 'Herrera',
    SegundoApellido: '',
    MontoAprobado: 30000000,
    Email: 'rherrera@epik.com.co',
    Celular: '3144112104',
    AccountBank: 'Davivienda',
    AccountNumber: '79215',
  },
];

export const incomeList = [
  {Id: 1, Descripcion: 'Menor a 1m'},
  {Id: 2, Descripcion: 'Entre 1m y 2m'},
  {Id: 3, Descripcion: 'Entre 2m y 3m'},
  {Id: 4, Descripcion: 'Entre 3m y 4m'},
  {Id: 5, Descripcion: 'Entre 4m y 5m'},
  {Id: 6, Descripcion: 'Mayor a 5m'},
];

export const occupationList = [
  {Id: 1, Descripcion: 'AMA DE CASA'},
  {Id: 2, Descripcion: 'ASALARIADO'},
  {Id: 3, Descripcion: 'ESTUDIANTE'},
  {Id: 4, Descripcion: 'INDEPENDIENTE FORMAL'},
  {Id: 5, Descripcion: 'INDEPENDIENTE INFORMAL'},
  {Id: 6, Descripcion: 'PENSIONADO'},
  {Id: 7, Descripcion: 'PRESTADOR DE SERVICIOS'},
  {Id: 8, Descripcion: 'RENTISTA'},
];

export const laboralAntiquityList = [
  {Id: 1, Descripcion: '0 a 6 meses'},
  {Id: 2, Descripcion: '6 meses a 1 año'},
  {Id: 3, Descripcion: '1 a 2 años'},
  {Id: 4, Descripcion: 'Más de 2 años'},
];

export const codigoCIIUList = [
  {Id: '10', Descripcion: 'Empleado'},
];

export function cleanData(): void {
  const keys = [
    'userData',
    'NumeroIdentificacion',
    'oUrl',
    'requestMoney',
    'IdConsulta',
    'dni-placeholder',
    'dni-reverse',
  ];

  keys.forEach(key => {
    localStorage.removeItem(key);
  });
}