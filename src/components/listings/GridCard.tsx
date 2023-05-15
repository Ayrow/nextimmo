import { IListingDocument } from '../../../types/listingTypes';

const GridCard = ({ listing }: { listing: IListingDocument }) => {
  const { ref, nbPieces, prix, location, lieu, statut } = listing;
  return <div>GridCard</div>;
};

export default GridCard;
