import IFoodExtra from './foodExtra';

export default interface IFood {
  id: number;
  name: string;
  description: string;
  price: string;
  category: number;
  image_url: string;
  available: boolean;
  extras: IFoodExtra[];
}
