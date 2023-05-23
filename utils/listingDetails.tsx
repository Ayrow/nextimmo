export type ListingDetailsTypes = {
  id: number;
  name: string;
  label: string;
};

const equipementsInterieur: ListingDetailsTypes[] = [
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

const equipementsExterieur: ListingDetailsTypes[] = [
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

const expositionsBien: ListingDetailsTypes[] = [
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

export { equipementsInterieur, equipementsExterieur, expositionsBien };
