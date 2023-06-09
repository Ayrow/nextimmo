import { Schema, model, models, Types, Model } from 'mongoose';
import { IListingDocument } from '../types/listingTypes';

const listingSchema: Schema<IListingDocument> = new Schema(
  {
    ref: {
      type: String,
      required: [true, 'Veuillez ajouter une référence'],
      unique: true,
    },
    transaction: {
      type: String,
      enum: ['location', 'vente'],
    },
    location: {
      loyerMensuel: Number,
      Caution: Number,
    },
    prix: {
      type: Number,
    },
    dateConstruction: Number,
    nbPieces: {
      type: Number,
      required: [true, 'Veuillez indiquer le nombre de pièces'],
    },
    nbChambres: {
      type: Number,
      required: [true, 'Veuillez indiquer le nombre de chambres'],
    },
    nbSDB: {
      type: Number,
      required: [true, 'Veuillez indiquer le nombre de salle de bain'],
    },
    nbEtages: {
      type: Number,
      required: [true, "Veuillez indiquer le nombre d'étages"],
    },
    typeDeBien: {
      type: String,
      enum: [
        'maison',
        'appartement',
        'terrain',
        'immeuble',
        'parking',
        'garage',
        'bureau',
      ],
      required: [true, 'Veuillez indiquer le type de bien'],
    },
    statut: {
      type: String,
      enum: ['bientôt', 'disponible', 'offreEnCours', 'vendu', 'loué'],
    },
    surfaceInt: {
      type: Number,
      required: [true, 'Veuillez indiquer une surface'],
    },
    surfaceExt: Number,
    lieu: {
      quartier: String,
      ville: {
        type: String,
        required: [true, 'Veuillez indiquer une ville'],
      },
      codePostal: {
        type: String,
        required: [true, 'Veuillez indiquer un code postal'],
      },
    },
    equipements: {
      interieur: [
        {
          type: String,
        },
      ],
      exterieur: [
        {
          type: String,
        },
      ],
    },
    typeChauffage: {
      type: String,
    },
    exposition: {
      type: String,
    },
    description: String,
    consoEnergetique: Number,
    ges: Number,
    honoraires: {
      chargeVendeur: Boolean,
      taux: Number,
      fraisAgence: Number,
    },
    photos: [String],
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [
        true,
        'Un compte agent est nécessaire pour ajouter une annonce',
      ],
    },
    etat: {
      type: String,
    },
    nbAjoutFavoris: {
      type: Number,
      default: 0,
      min: 0,
    },
    nbVues: {
      type: Number,
      default: 0,
      min: 0,
    },
    nbContact: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Listing: Model<IListingDocument> =
  models.Listing || model<IListingDocument>('Listing', listingSchema);

export default Listing;
