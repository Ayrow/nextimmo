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
  lieu?: {
    quartier?: any;
    ville?: any;
    codePostal?: any;
  };
  typeDeBien?: { $in: string[] } | string;
  prix?: NumberFilter;
  surfaceInt?: NumberFilter;
  surfaceExt?: NumberFilter;
  nbPieces?: any;
  nbChambres?: PiecesFilter;
  nbSDB?: PiecesFilter;
  typeChauffage?: string[];
  equipements?: {
    intérieur?: string[];
    extérieur?: string[];
  };
  exposition?: string[];
  draft: boolean;
};

const regexContainsChar = /[a-zA-Z]/;

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);

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
  const equipementsInt = searchParams.get('equipementsInt');
  const equipementsExt = searchParams.get('equipementsExt');
  const exposition = searchParams.get('exposition');

  const queryObject: QueryObjectType = {
    statut: statut,
    transaction: transaction,
    draft: false,
  };

  if (quartier) {
    const regex = new RegExp(quartier, 'i');
    queryObject['lieu.quartier'] = { $regex: regex };
  }

  if (ville) {
    const regex = new RegExp(ville, 'i');
    queryObject['lieu.ville'] = { $regex: regex };
  }

  if (codePostal) {
    const regex = new RegExp(codePostal, 'i');
    queryObject['lieu.codePostal'] = { $regex: regex };
  }

  const checkArrayIncludeElement = (element: string, prop: string) => {
    if (element.includes(',')) {
      const arrayelement = element.split(',');
      queryObject[prop] = { $in: arrayelement };
    } else {
      queryObject[prop] = element;
    }
  };

  if (typeDeBien) {
    checkArrayIncludeElement(typeDeBien, `typeDeBien`);
  }

  if (typeChauffage) {
    checkArrayIncludeElement(typeChauffage, 'typeChauffage');
  }

  if (equipementsInt) {
    checkArrayIncludeElement(equipementsInt, `equipements.interieur`);
  }

  if (equipementsExt) {
    checkArrayIncludeElement(equipementsExt, `equipements.exterieur`);
  }

  if (exposition) {
    checkArrayIncludeElement(exposition, 'exposition');
  }

  const checkNbRoomsInterval = (keyValue: string, keyName: string) => {
    if (keyValue.length == 1) {
      queryObject[keyName] = keyValue;
    } else {
      let arrayPieces = keyValue.split(',').sort();
      queryObject[keyName] = {
        $gte: parseInt(arrayPieces[0]),
        $lte: parseInt(arrayPieces[arrayPieces.length - 1]),
      };
    }
  };

  if (nbPieces) {
    checkNbRoomsInterval(nbPieces, 'nbPieces');
  }

  if (nbChambres) {
    checkNbRoomsInterval(nbChambres, 'nbChambres');
  }

  if (nbSDB) {
    checkNbRoomsInterval(nbSDB, 'nbSDB');
  }

  const checkMinMaxInterval = (min: string, max: string, name: string) => {
    if (regexContainsChar.test(min)) {
      min = '';
    }

    if (regexContainsChar.test(max)) {
      max = '';
    }

    if (min && max) {
      queryObject[name] = { $gte: parseInt(min), $lte: parseInt(max) };
    } else if (min && !max) {
      queryObject[name] = { $gte: parseInt(min) };
    } else if (!min && max) {
      queryObject[name] = { $lte: parseInt(max) };
    }
  };
  checkMinMaxInterval(minPrice, maxPrice, 'prix');
  checkMinMaxInterval(minSurfaceInt, maxSurfaceInt, 'surfaceInt');
  checkMinMaxInterval(minSurfaceExt, maxSurfaceExt, 'surfaceExt');

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
