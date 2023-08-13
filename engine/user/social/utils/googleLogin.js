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

const { hashPassword } = require("../passwordHash");
const serverError = require("../serverError");

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

        let existinEmail = await global.DB_HANDLER(`SELECT * FROM ${usertype} WHERE email='${payload.email}' AND social_login!='1' AND social_platform!='google'`);

        if (existinEmail && existinEmail[0]) {
            loginFailureReason = "Email Exists Already";
            isGoogleAuthValid = false;
            return { isGoogleAuthValid: isGoogleAuthValid, newFoundUser: newFoundUser, loginFailureReason: loginFailureReason };
        }

        ////////////////////////////////////////

        foundUser = await global.DB_HANDLER(`SELECT * FROM ${usertype} WHERE email='${payload.email}' AND social_login='1' AND social_platform='google'`);

        if (foundUser && foundUser[0]) {
            newFoundUser = foundUser;
            return { isGoogleAuthValid: isGoogleAuthValid, newFoundUser: newFoundUser };
        }

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        let newUser = await global.DB_HANDLER(`INSERT INTO ${usertype} (
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
        )`);

        newFoundUser = await global.DB_HANDLER(`SELECT * FROM ${usertype} WHERE id='${newUser.insertId}'`);

        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
    } catch (error) {
        serverError({
            component: "googleLogin",
            message: error.message,
            user: {},
        });

        loginFailureReason = error;

        isUserValid = false;
        isSocialValidated = false;
    }

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    return { isGoogleAuthValid: isGoogleAuthValid, newFoundUser: newFoundUser };
};
