// import type { CallHandler, ExecutionContext } from '@nestjs/common';

// import type { AuthUser } from '../common/dto/AuthUser';
// import {
//   AccessTokenClaim,
//   getClaim,
//   getClaimName,
//   StringConstants,
// } from '../interceptors/auth-user-interceptor.service';

// /**
//  * mockAuthUserInterceptor
//  * @param {StringConstants} appName
//  * @param {any[]} permissions
//  * @return {*}
//  */
// const mockAuthUserInterceptor = (
//   appName: StringConstants,
//   permissions: any[],
// ) => {
//   const getMockAuthUserInterceptor: any = {
//     intercept: jest.fn((context: ExecutionContext, next: CallHandler) => {
//       const req = context.switchToHttp().getRequest();

//       const user: AuthUser = {
//         iss: 'iss',
//         sub: 'user1',
//         aud: [],
//         iat: 1,
//         exp: 1,
//         azp: 'azp',
//         scope: 'scope',
//         permissions,
//       };
//       user[getClaimName(AccessTokenClaim.CLIENT_NAME)] = appName;
//       user[getClaimName(AccessTokenClaim.USER_ID)] = 'user1';

//       const client = getClaim(AccessTokenClaim.CLIENT_NAME, user);

//       user.clientName = client || undefined;

//       if (client === StringConstants.PORTAL_APP_NAME) {
//         user.userId = getClaim(AccessTokenClaim.USER_ID, user) || undefined;
//       }
//       if (client === StringConstants.PLATFORM_APP_NAME) {
//         user.customerId = getClaim(AccessTokenClaim.USER_ID, user) || undefined;
//       }
//       delete user[`${getClaimName(AccessTokenClaim.CLIENT_NAME)}`];
//       delete user[`${getClaimName(AccessTokenClaim.USER_ID)}`];

//       req.user = user;

//       return next.handle();
//     }),
//   };

//   return getMockAuthUserInterceptor;
// };

// // eslint-disable-next-line import/no-default-export
// export default mockAuthUserInterceptor;
