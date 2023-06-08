import { ListingQueryParamsType } from '../types/listingTypes';

export type ListingDetailsTypes = {
  id: number;
  name: string;
  label: string;
};

const sortOptions: string[] = [
  'plus récente',
  'plus ancienne',
  'prix croissant',
  'prix décroissant',
];

const statutOptions: string[] = [
  'bientôt',
  'disponible',
  'offreEnCours',
  'vendu',
  'loué',
];

const etatsAnnonceOptions: string[] = [
  'toutes les annonces',
  'publiée',
  'brouillon',
];

const nbRooms = ['1', '2', '3', '4', '5', '6'];

const listTypeDeBien: ListingDetailsTypes[] = [
  {
    id: 1,
    name: 'maison',
    label: 'Maison',
  },
  {
    id: 2,
    name: 'appartement',
    label: 'Appartement',
  },
  {
    id: 3,
    name: 'terrain',
    label: 'Terrain',
  },
  {
    id: 4,
    name: 'Immeuble',
    label: 'Immeuble',
  },
  {
    id: 5,
    name: 'parking',
    label: 'Parking',
  },
  {
    id: 6,
    name: 'garage',
    label: 'Garage',
  },
  {
    id: 7,
    name: 'bureau',
    label: 'Bureau',
  },
];

const listEquipementsInterieur: ListingDetailsTypes[] = [
  {
    id: 1,
    name: 'cave',
    label: 'Cave',
  },
  {
    id: 2,
    name: 'garage',
    label: 'Garage',
  },
  {
    id: 3,
    name: 'veranda',
    label: 'Veranda',
  },
  {
    id: 4,
    name: 'ascenseur',
    label: 'Ascenseur',
  },
  {
    id: 5,
    name: 'plainPied',
    label: 'Plain Pied',
  },
  {
    id: 6,
    name: 'accessibilitePRM',
    label: 'Accessibilité PRM',
  },
  {
    id: 7,
    name: 'digicode',
    label: 'Digicode',
  },
  {
    id: 8,
    name: 'alarme',
    label: 'Alarme',
  },
  {
    id: 9,
    name: 'interphone',
    label: 'Interphone',
  },
  {
    id: 10,
    name: 'cheminee',
    label: 'Cheminée',
  },
  {
    id: 11,
    name: 'climatisation',
    label: 'Climatisation',
  },
  {
    id: 12,
    name: 'gardien',
    label: 'Gardien',
  },
  {
    id: 13,
    name: 'toiletteSepare',
    label: 'Toilette Separé',
  },
  {
    id: 14,
    name: 'cuisineEquipee',
    label: 'Cuisine Équipée',
  },
];

const listEquipementsExterieur: ListingDetailsTypes[] = [
  {
    id: 1,
    name: 'balcon',
    label: 'Balcon',
  },
  {
    id: 2,
    name: 'terrasse',
    label: 'Terrasse',
  },
  {
    id: 3,
    name: 'piscine',
    label: 'Piscine',
  },
  {
    id: 4,
    name: 'jardin',
    label: 'Jardin',
  },
  {
    id: 5,
    name: 'stationnement',
    label: 'Stationnement',
  },
  {
    id: 6,
    name: 'portail',
    label: 'Portail',
  },
];

const listExpositionsBien: ListingDetailsTypes[] = [
  {
    id: 1,
    name: 'nord',
    label: 'Nord',
  },
  {
    id: 2,
    name: 'sud',
    label: 'Sud',
  },
  {
    id: 3,
    name: 'est',
    label: 'Est',
  },
  {
    id: 4,
    name: 'ouest',
    label: 'Ouest',
  },
  {
    id: 5,
    name: 'vueMer',
    label: 'Vue Mer',
  },
  {
    id: 6,
    name: 'procheMer',
    label: 'Proche Mer',
  },
];

const listTypeChauffage: ListingDetailsTypes[] = [
  {
    id: 1,
    name: 'gaz',
    label: 'Gaz',
  },
  {
    id: 2,
    name: 'fioul',
    label: 'Fioul',
  },
  {
    id: 3,
    name: 'electrique',
    label: 'Électrique',
  },
  {
    id: 4,
    name: 'solaire',
    label: 'Solaire',
  },
  {
    id: 5,
    name: 'bois',
    label: 'Bois',
  },
  {
    id: 6,
    name: 'pac',
    label: 'Pompe À Chaleur',
  },
];

const queryParams: ListingQueryParamsType = {
  refListing: '',
  transaction: 'vente',
  statut: 'disponible',
  etat: 'publiée',
  quartier: '',
  ville: '',
  codePostal: '',
  typeDeBien: ['maison', 'appartement'],
  minPrice: '',
  maxPrice: '',
  minSurfaceInt: '',
  maxSurfaceInt: '',
  minSurfaceExt: '',
  maxSurfaceExt: '',
  nbPieces: '',
  nbChambres: '',
  nbSDB: '',
  typeChauffage: '',
  equipementsInt: '',
  equipementsExt: '',
  exposition: '',
  sort: 'plus récente',
  limit: 12,
  page: 1,
};

export {
  listEquipementsInterieur,
  listEquipementsExterieur,
  listExpositionsBien,
  listTypeChauffage,
  listTypeDeBien,
  nbRooms,
  queryParams,
  sortOptions,
  statutOptions,
  etatsAnnonceOptions,
};
