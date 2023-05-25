import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../utils/connectDB';
import Listing from '../../../../models/listingModel';
import { IListingDocument } from '../../../../types/listingTypes';

type RegexFilter = {
  $regex: string;
  $options: string;
};

type NumberFilter =
  | { $and: [{ $gte: number }, { $lte: number }] }
  | { $gte: number }
  | { $lte: number };

type PiecesFilter = number | { $and: [{ $gte: number }, { $lte: number }] };

type QueryObjectType = {
  transaction: string;
  statut: string;
  quartier?: RegexFilter;
  ville?: RegexFilter;
  codePostal?: number;
  typeDeBien?: string[];
  prix?: NumberFilter;
  surfaceInt?: NumberFilter;
  surfaceExt?: NumberFilter;
  nbPieces?: PiecesFilter;
  nbChambres?: PiecesFilter;
  nbSDB?: PiecesFilter;
  typeChauffage?: string;
  equipements?: string[];
  exposition?: string[];
  draft: boolean;
};

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);

  {
    /* searchParams.forEach((value, key) => {
    if (
      key !== 'page' &&
      key !== 'numOfPages' &&
      key !== 'sort' &&
      key !== 'limit'
    ) {
      queryObject[key] = value;
    }
  }); */
  }

  const statut = searchParams.get('statut');
  const transaction = searchParams.get('transaction');
  const quartier = searchParams.get('quartier');
  const ville = searchParams.get('ville');
  const codePostal = searchParams.get('codePostal');
  const typeDeBien = searchParams.get('typeDeBien');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minSurfaceInt = searchParams.get('minSurfaceInt');
  const maxSurfaceInt = searchParams.get('maxSurfaceInt');
  const minSurfaceExt = searchParams.get('minSurfaceExt');
  const maxSurfaceExt = searchParams.get('maxSurfaceExt');
  const nbPieces = searchParams.get('nbPieces');
  const nbChambres = searchParams.get('nbChambres');
  const nbSDB = searchParams.get('nbSDB');
  const typeChauffage = searchParams.get('typeChauffage');
  const equipements = searchParams.get('equipements');
  const exposition = searchParams.get('exposition');

  const queryObject: QueryObjectType = {
    statut: statut,
    transaction: transaction,
    draft: false,
  };

  if (quartier) {
    queryObject.quartier = { $regex: quartier, $options: 'i' };
  }

  if (ville) {
    queryObject.ville = { $regex: ville, $options: 'i' };
  }

  if (codePostal) {
    queryObject.codePostal = parseInt(codePostal);
  }

  if (typeChauffage) {
    queryObject.typeChauffage = typeChauffage;
  }

  const checkNbRoomsInterval = (keyNames: string[]) => {
    keyNames.forEach((keyName) => {
      if (keyName) {
        const arrayPieces = keyName.split(',').sort();
        if (arrayPieces.length === 1) {
          queryObject[keyName] = parseInt(keyName);
        } else {
          queryObject[keyName] = {
            $and: [
              { $gte: parseInt(arrayPieces[0]) },
              { $lte: parseInt(arrayPieces[arrayPieces.length - 1]) },
            ],
          };
        }
      }
    });
  };

  checkNbRoomsInterval([nbPieces, nbChambres, nbSDB]);

  const checkMinMaxInterval = (min: string, max: string) => {
    if (min && max) {
      queryObject.prix = {
        $and: [{ $gte: parseInt(min) }, { $lte: parseInt(max) }],
      };
    } else if (min && !max) {
      queryObject.prix = { $gte: parseInt(min) };
    } else if (max && !min) {
      queryObject.prix = { $lte: parseInt(max) };
    }
  };

  checkMinMaxInterval(minPrice, maxPrice);
  checkMinMaxInterval(minSurfaceInt, maxSurfaceInt);
  checkMinMaxInterval(minSurfaceExt, maxSurfaceExt);

  const sort = searchParams.get('sort');

  let result = Listing.find(queryObject).lean();

  if (sort === 'oldest') {
    result = result.sort({ createdAt: 1 });
  } else if (sort === 'latest') {
    result = result.sort({ createdAt: -1 });
  }
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 12;
  const skip = (page - 1) * limit;

  const allListings = (await result
    .skip(skip)
    .limit(limit)
    .exec()) as IListingDocument[];
  const totalListingsFound = await Listing.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalListingsFound / limit);

  if (allListings) {
    return new NextResponse(
      JSON.stringify({ allListings, totalListingsFound, numOfPages }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } else {
    throw new Error('No listing found');
  }
}
