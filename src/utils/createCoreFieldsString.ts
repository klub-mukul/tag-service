import { v4 as uuidv4 } from 'uuid';

const createCoreFieldsString = (dto: any) => {
  const name: string = dto.name != null ? dto.name + '-' : '';
  const type: string = dto.type != null ? dto.type + '-' : '';
  const resourceId: string = dto.resourceId != null ? dto.resourceId + '-' : '';
  const resourceType: string =
    dto.resourceType != null ? dto.resourceType + '-' : '';
  const resource: string = dto.resource != null ? dto.resource : '';
  return name + type + resource + resourceType + resourceId;
};

export default createCoreFieldsString;
