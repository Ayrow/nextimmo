import { Document, ObjectId } from 'mongoose';

interface ILocation {
  loyerMensuel: number;
  caution: number;
}

interface ILieu {
  quartier: string;
  ville: string;
  codePostal: number;
}

interface IEquipInt {
  cave: boolean;
  garage: boolean;
  veranda: boolean;
  ascenseur: boolean;
  plainPied: boolean;
  accessibilitePMR: boolean;
  digiCode: boolean;
  alarme: boolean;
  Interphone: boolean;
  cheminee: boolean;
  climatisation: boolean;
  gardien: boolean;
  toiletteSepare: boolean;
  cuisineEquipee: boolean;
}

interface IEquipExt {
  balcon: boolean;
  terrasse: boolean;
  piscine: boolean;
  jardin: boolean;
  stationnement: boolean;
  portail: boolean;
}

interface IEquip {
  interieur: IEquipInt;
  exterieur: IEquipExt;
}

interface IHonoraires {
  aCharge: string;
  taux: number;
  fraisAgence: number;
}

export interface IListing {
  ref: string;
  transaction: string;
  location: ILocation;
  prix: number;
  dateConstruction: number;
  nbPieces: number;
  nbChambres: number;
  nbSDB: number;
  nbEtages: number;
  typeDeBien: string;
  statut: string;
  surfaceInt: number;
  surfaceExt: number;
  lieu: ILieu;
  equipements: IEquip;
  typeChauffage: string;
  exposition: string;
  description: string;
  consoEnergetique: number;
  ges: number;
  honoraires: IHonoraires;
  photos: string[];
}

export interface IListingDocument extends Document, IListing {
  createdBy: ObjectId;
  nbAjoutFavoris: number;
}
