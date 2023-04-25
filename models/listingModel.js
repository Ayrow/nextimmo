import { Schema, model, models } from 'mongoose';

const listingSchema = new Schema({
  title: String,
});

const Listing = models.Listing || model('Listing', listingSchema);

export default Listing;
