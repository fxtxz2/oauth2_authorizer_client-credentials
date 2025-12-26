export const generatePolicy = (clientId, effect, scope, resource) => {
     
    let policy = {
      principalId: clientId,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: effect,
            Resource: resource
          }
        ]
      }
    };
    
    if(scope){
        policy.context = {
            permissions: scope.join(" ")
        }
    }
    return policy;
};

export const getToken = (tokenString) => {
    let tokenParts = tokenString.split(" ");
    if(!tokenParts || tokenParts.length != 2 || tokenParts[0] !== 'Bearer'){
        throw new Error("Token is not valid");
    }
    
    return tokenParts[1];
};