export const oidConfig = {
    authority: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_DrElqz2Cd",
    client_id: "5rckvpl3780cids2uafeljdl73",
    redirect_uri: `${window.location.origin}/auth/callback`,
    post_logout_redirect_uri: `${window.location.origin}`,
    response_type: "code",
    scope: "openid email phone",
}; 