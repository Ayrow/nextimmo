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

interface IEquip {
  interieur: string[];
  exterieur: string[];
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
  draft: boolean;
}

export interface IListingDocument extends Document, IListing {
  createdBy: ObjectId;
  nbAjoutFavoris: number;
}
