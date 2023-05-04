import { Schema, model, models, Types } from 'mongoose';

const listingSchema = new Schema(
  {
    ref: String,
    prix: Int,
    dateConstruction: Int,
    nbPieces: Int,
    nbChambres: Int,
    nbSDB: Int,
    nbEtages: Int,
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
      default: 'maison',
    },
    status: {
      enum: ['bientôt', 'disponible', 'offre en cours'],
      default: 'Accepting offers',
    },
    squareFeet: Int,
    lotSize: Int,
    lieu: {
      quartier: String,
      ville: String,
      codePostal: String,
    },
    equipements: {
      intérieur: {
        cave: Bool,
        garage: Bool,
        veranda: Bool,
        ascenseur: Bool,
        plainPied: Bool,
        accessibilitePMR: Bool,
        digiCode: Bool,
        alarme: Bool,
        interphone: Bool,
        cheminee: Bool,
        climatisation: Bool,
        gardien: Bool,
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
      default: 'gaz',
    },
    exposition: {
      enum: ['nord', 'sud', 'est', 'ouest', 'vueMer', 'procheMer'],
      default: 'Accepting offers',
    },
    description: String,
    dpe: Int,
    ges: Int,
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [
        true,
        'Un compte agent est nécessaire pour ajouter une annonce',
      ],
    },
    nbAjoutFavoris: Int,
  },
  { timestamps: true }
);

const Listing = models.Listing || model('Listing', listingSchema);

export default Listing;
