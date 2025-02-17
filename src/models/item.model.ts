import {Entity, model, property} from '@loopback/repository';

@model({
  settings:{
    mysql:{
      table:"item"
    }
  }
})
export class Item extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    mysql:{
      column:'sale_id'
    }
  })
  saleId: number;

  @property({
    type: 'number',
    required: true,
    mysql:{
      column:'product_id'
    }
  })
  productId: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;


  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
