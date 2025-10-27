import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  category: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
