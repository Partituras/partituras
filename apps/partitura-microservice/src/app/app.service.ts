import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GetAllRequest,
  GetByIdRequest,
  IPartituraService,
  PaginatedPartiturasResponse,
} from '@partituras/services';
import { Nullable, Partitura, PartituraId } from '@partituras/domain';
import { PartituraClass, PartituraDocument } from './app.schema';

@Injectable()
export class AppService implements IPartituraService {
  constructor(
    @InjectModel(PartituraClass.name)
    private partituraModel: Model<PartituraDocument>
  ) {}

  async getById(
    request: GetByIdRequest<PartituraId>
  ): Promise<Nullable<Partitura>> {
    return this.partituraModel.findById(request.id);
  }

  async getAll(
    request: GetAllRequest<PartituraId>
  ): Promise<PaginatedPartiturasResponse> {
    const { matches, startsWith, genre } = request.filter || {};
    const { limit, next } = request.options;

    const filter = {
      ...(matches == null
        ? {}
        : {
            $text: {
              $search: matches,
              $caseSensitive: false,
              $diacriticSensitive: false,
            },
          }),
      ...(startsWith == null
        ? {}
        : { title: new RegExp(`^${startsWith}`, 'i') }),
      ...(genre == null ? {} : { genre: new RegExp(`^${genre}$`, 'i') }),
      ...(next == null ? {} : { _id: { $gt: next } }),
    };

    console.log('FILTER', filter);

    const items = await this.partituraModel
      .find(filter)
      .sort({
        _id: 1,
        title: 1,
      })
      .limit(limit);

    return {
      items,
      pagination: {
        next: items.length > 0 ? items[items.length - 1]._id : null,
      },
    };
  }
}
