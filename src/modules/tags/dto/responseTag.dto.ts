import { TagConditions } from './tagConditions.dto';
import { Tag } from './../tag.entity';

export class ResponseTagDto {
  id: string;
  name: string;
  type: string;
  resource?: string;
  resourceId?: string;
  resourceType?: string;
  conditions?: TagConditions[];
  isStatic: boolean;
  slug: string;

  constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
    this.type = tag.type;
    this.resource = tag.resource;
    this.resourceId = tag.resourceId;
    this.resourceType = tag.resourceType;
    this.conditions = tag.conditions;
    this.isStatic = tag.isStatic;
    this.slug = tag.slug;
  }
}
