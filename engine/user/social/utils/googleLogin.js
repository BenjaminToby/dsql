// @ts-check

/**
 * ==============================================================================
 * Imports
 * ==============================================================================
 */
const fs = require("fs");

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

const { OAuth2Client } = require("google-auth-library");

const dbHandler = require("../../../engine/utils/dbHandler");
const hashPassword = require("../../../../functions/hashPassword");

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

/**
 * ==============================================================================
 * Main Function
 * ==============================================================================
 * @param {Object} params - foundUser if any
 */
module.exports = async function googleLogin({ usertype, foundUser, isSocialValidated, isUserValid, reqBody, serverRes, loginFailureReason }) {
    const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    let isGoogleAuthValid = false;
    let newFoundUser = null;

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    try {
        const ticket = await client.verifyIdToken({
            idToken: reqBody.token,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });

        // @ts-ignore
        const payload = ticket.payload;
        const userid = payload["sub"];

        isUserValid = payload.email_verified;

        if (!isUserValid || !payload || !payload.email_verified) return;

        serverRes.isUserValid = payload.email_verified;
        isSocialValidated = payload.email_verified;
        isGoogleAuthValid = payload.email_verified;
        ////// If request specified a G Suite domain:
        ////// const domain = payload['hd'];

        let socialHashedPassword = hashPassword(payload.jti);

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        let existinEmail = await dbHandler({
            query: `SELECT * FROM ${usertype} WHERE email = ? AND social_login!='1' AND social_platform!='google'`,
            values: [payload.email],
        });

        if (existinEmail && existinEmail[0]) {
            loginFailureReason = "Email Exists Already";
            isGoogleAuthValid = false;
            return { isGoogleAuthValid: isGoogleAuthValid, newFoundUser: newFoundUser, loginFailureReason: loginFailureReason };
        }

        ////////////////////////////////////////

        foundUser = await dbHandler({
            query: `SELECT * FROM ${usertype} WHERE email = ? AND social_login='1' AND social_platform='google'`,
            values: [payload.email],
        });

        if (foundUser && foundUser[0]) {
            newFoundUser = foundUser;
            return { isGoogleAuthValid: isGoogleAuthValid, newFoundUser: newFoundUser };
        }

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        let newUser = await dbHandler({
            query: `INSERT INTO ${usertype} (
                first_name,
                last_name,
                social_platform,
                social_name,
                social_id,
                email,
                image,
                image_thumbnail,
                password,
                verification_status,
                social_login,
                terms_agreement,
                date_created,
                date_code
            ) VALUES (
                '${payload.given_name}',
                '${payload.family_name}',
                'google',
                'google_${payload.email.replace(/@.*/, "")}',
                '${payload.sub}',
                '${payload.email}',
                '${payload.picture}',
                '${payload.picture}',
                '${socialHashedPassword}',
                '1',
                '1',
                '1',
                '${Date()}',
                '${Date.now()}'
            )`,
        });

        newFoundUser = await dbHandler({
            query: `SELECT * FROM ${usertype} WHERE id = ?`,
            values: [newUser.insertId],
        });

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
    } catch (error) {
        loginFailureReason = error;

        isUserValid = false;
        isSocialValidated = false;
    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    return { isGoogleAuthValid: isGoogleAuthValid, newFoundUser: newFoundUser };
};
