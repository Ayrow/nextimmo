import { Schema, model, models, Types } from 'mongoose';

const listingSchema = new Schema(
  {
    ref: String,
    prix: Int,
    nbPieces: Int,
    chambres: Int,
    salleDeBains: Int,
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
      balcon: Bool,
      terrasse: Bool,
      piscine: Bool,
      jardin: Bool,
      cave: Bool,
      stationnement: Bool,
      garage: Bool,
      ascenseur: Bool,
      plainPied: Bool,
      accessibilitePMR: Bool,
      cheminee: Bool,
      climatisation: Bool,
      interphone: Bool,
      digiCode: Bool,
      alarme: Bool,
      veranda: Bool,
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
    dpe: {
      enum: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      default: 'd',
    },
    ges: {
      enum: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      default: 'd',
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Un compte est nécessaire pour ajouter une annonce'],
    },
    nbAjoutFavoris: Int,
  },
  { timestamps: true }
);

const Listing = models.Listing || model('Listing', listingSchema);

export default Listing;
