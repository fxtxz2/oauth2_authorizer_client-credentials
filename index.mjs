import { verifyJWT } from './jwtVerificationHelper.mjs';
import { getToken, generatePolicy } from './helpers.mjs';

export const handler = async (event) => {
   try{
      console.log(event);
      let token = getToken(event.authorizationToken);
      let verified = await verifyJWT(token);
      console.log(verified);
      if(verified.isValid){
         let policy =  generatePolicy(verified.clientId, 'Allow', verified.scope, event.methodArn);
         console.log(JSON.stringify(policy));
         return policy;
      }
      return generatePolicy(verified.clientId, 'Deny', null, event.methodArn);
   }
   catch(err){
      console.error(err);
      throw new Error("Unauthorized");
   }
};