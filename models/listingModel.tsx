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
      enum: ['location', 'vente'],
      required: [true, 'Veuillez indiquer le type de transaction'],
    },
    location: {
      loyerMensuel: Number,
      Caution: Number,
    },
    prix: {
      type: Number,
      required: [true, 'Veuillez indiquer un prix'],
    },
    dateConstruction: Number,
    nbPieces: Number,
    nbChambres: Number,
    nbSDB: Number,
    nbEtages: Number,
    typeDeBien: {
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
      // default: 'maison',
    },
    statut: {
      enum: ['bientôt', 'disponible', 'offre en cours'],
      default: 'disponible',
    },
    surfaceInt: {
      type: Number,
      required: [true, 'Veuillez indiquer une surface'],
    },
    surfaceExt: Number,
    lieu: {
      quartier: String,
      ville: String,
      codePostal: String,
    },
    equipements: {
      intérieur: {
        cave: Boolean,
        garage: Boolean,
        veranda: Boolean,
        ascenseur: Boolean,
        plainPied: Boolean,
        accessibilitePMR: Boolean,
        digiCode: Boolean,
        alarme: Boolean,
        Interphone: Boolean,
        cheminee: Boolean,
        climatisation: Boolean,
        gardien: Boolean,
        toiletteSepare: Boolean,
        cuisineEquipee: Boolean,
      },
      extérieur: {
        balcon: Boolean,
        terrasse: Boolean,
        piscine: Boolean,
        jardin: Boolean,
        stationnement: Boolean,
        portail: Boolean,
      },
    },
    typeChauffage: {
      enum: [
        'gaz',
        'fioul',
        'electrique',
        'solaire',
        'bois',
        'pompe à chaleur',
      ],
      //  default: 'gaz',
    },
    exposition: {
      enum: ['nord', 'sud', 'est', 'ouest', 'vueMer', 'procheMer'],
    },
    description: String,
    consoEnergetique: Number,
    ges: Number,
    honoraires: {
      chargeVendeur: Boolean,
      taux: Number,
    },
    photos: [
      {
        lienPhoto: String,
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [
        true,
        'Un compte agent est nécessaire pour ajouter une annonce',
      ],
    },
    nbAjoutFavoris: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Listing: Model<IListingDocument> =
  models.Listing || model<IListingDocument>('Listing', listingSchema);

export default Listing;
