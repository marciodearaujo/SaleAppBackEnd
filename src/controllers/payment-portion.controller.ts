import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PaymentPortion} from '../models';
import {PaymentPortionRepository} from '../repositories';

export class PaymentPortionController {
  constructor(
    @repository(PaymentPortionRepository)
    public paymentPortionRepository : PaymentPortionRepository,
  ) {}

  @post('/payment-portions')
  @response(200, {
    description: 'PaymentPortion model instance',
    content: {'application/json': {schema: getModelSchemaRef(PaymentPortion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentPortion, {
            title: 'NewPaymentPortion',
            exclude: ['id'],
          }),
        },
      },
    })
    paymentPortion: Omit<PaymentPortion, 'id'>,
  ): Promise<PaymentPortion> {
    return this.paymentPortionRepository.create(paymentPortion);
  }

  @get('/payment-portions/count')
  @response(200, {
    description: 'PaymentPortion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PaymentPortion) where?: Where<PaymentPortion>,
  ): Promise<Count> {
    return this.paymentPortionRepository.count(where);
  }

  @get('/payment-portions')
  @response(200, {
    description: 'Array of PaymentPortion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PaymentPortion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PaymentPortion) filter?: Filter<PaymentPortion>,
  ): Promise<PaymentPortion[]> {
    return this.paymentPortionRepository.find(filter);
  }

  @patch('/payment-portions')
  @response(200, {
    description: 'PaymentPortion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentPortion, {partial: true}),
        },
      },
    })
    paymentPortion: PaymentPortion,
    @param.where(PaymentPortion) where?: Where<PaymentPortion>,
  ): Promise<Count> {
    return this.paymentPortionRepository.updateAll(paymentPortion, where);
  }

  @get('/payment-portions/{id}')
  @response(200, {
    description: 'PaymentPortion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PaymentPortion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PaymentPortion, {exclude: 'where'}) filter?: FilterExcludingWhere<PaymentPortion>
  ): Promise<PaymentPortion> {
    return this.paymentPortionRepository.findById(id, filter);
  }

  @patch('/payment-portions/{id}')
  @response(204, {
    description: 'PaymentPortion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentPortion, {partial: true}),
        },
      },
    })
    paymentPortion: PaymentPortion,
  ): Promise<void> {
    await this.paymentPortionRepository.updateById(id, paymentPortion);
  }

  @put('/payment-portions/{id}')
  @response(204, {
    description: 'PaymentPortion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() paymentPortion: PaymentPortion,
  ): Promise<void> {
    await this.paymentPortionRepository.replaceById(id, paymentPortion);
  }

  @del('/payment-portions/{id}')
  @response(204, {
    description: 'PaymentPortion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.paymentPortionRepository.deleteById(id);
  }
}
