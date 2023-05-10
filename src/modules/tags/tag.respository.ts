import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

/**
 * TagRepository
 * @export
 * @class TagRepository
 * @extends {Repository<Tag>}
 */
export class TagRepository extends Repository<Tag> {
  /**
   * constructor
   * Creates an instance of UserService.
   * @class TagRepository
   * @param {Repository<Tag>} tagRepository
   */
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {
    super(
      tagRepository.target,
      tagRepository.manager,
      tagRepository.queryRunner,
    );
  }
}
