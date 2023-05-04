import { Schema, model, models, Types } from 'mongoose';

const listingSchema = new Schema(
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
    surfaceNumber: {
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
      Numberérieur: {
        cave: Bool,
        garage: Bool,
        veranda: Bool,
        ascenseur: Bool,
        plainPied: Bool,
        accessibilitePMR: Bool,
        digiCode: Bool,
        alarme: Bool,
        Numbererphone: Bool,
        cheminee: Bool,
        climatisation: Bool,
        gardien: Bool,
        toiletteSepare: Bool,
        cuisineEquipee: Bool,
      },
      extérieur: {
        balcon: Bool,
        terrasse: Bool,
        piscine: Bool,
        jardin: Bool,
        stationnement: Bool,
        portail: Bool,
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
      chargeVendeur: Bool,
      Taux: Number,
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

const Listing = models.Listing || model('Listing', listingSchema);

export default Listing;
