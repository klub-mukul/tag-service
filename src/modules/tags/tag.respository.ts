import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

/**
 * TagRepository
 * @export
 * @class TagRepository
 * @extends {Repository<TagEntity>}
 */
export class TagRepository extends Repository<TagEntity> {
  /**
   * constructor
   * Creates an instance of UserService.
   * @class TagRepository
   * @param {Repository<TagEntity>} tagRepository
   */
  constructor(
    @InjectRepository(TagEntity) private readonly tagRepository: Repository<TagEntity>,
  ) {
    super(
      tagRepository.target,
      tagRepository.manager,
      tagRepository.queryRunner,
    );
  }
}
