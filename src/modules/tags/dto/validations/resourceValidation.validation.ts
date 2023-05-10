import { ResourceValidationException } from './../../../../exceptions/resourceValidationException.exception';

const resourceValidation = (
  resourceId: string,
  resourceType: string,
  resource: string,
) => {
  if (
    (resourceId == null && resourceType == null && resource == null) ||
    (resourceId != null && resourceType != null && resource != null)
  ) {
    return;
  }

  throw new ResourceValidationException(
    'resourceId, resourceType, resource are inconsistent',
  );
};

export default resourceValidation;
