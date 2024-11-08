import get = require("./utils/get");
import post = require("./utils/post");
export namespace media {
    export { uploadImage };
    export { uploadFile };
    export { deleteFile };
}
export namespace user {
    export { createUser };
    export { loginUser };
    export { sendEmailCode };
    export { logoutUser };
    export { userAuth };
    export { reAuthUser };
    export { updateUser };
    export { getUser };
    export { getToken };
    export { validateToken };
    export namespace social {
        export { loginWithGoogle };
        export { loginWithGithub };
    }
}
import getSchema = require("./utils/get-schema");
import sanitizeSql = require("./utils/functions/sanitizeSql");
import datasquirelClient = require("./client");
import uploadImage = require("./utils/upload-image");
import uploadFile = require("./utils/upload-file");
import deleteFile = require("./utils/delete-file");
import createUser = require("./users/add-user");
import loginUser = require("./users/login-user");
import sendEmailCode = require("./users/send-email-code");
import logoutUser = require("./users/logout-user");
import userAuth = require("./users/user-auth");
import reAuthUser = require("./users/reauth-user");
import updateUser = require("./users/update-user");
import getUser = require("./users/get-user");
import getToken = require("./users/get-token");
import validateToken = require("./users/validate-token");
import loginWithGoogle = require("./users/social/google-auth");
import loginWithGithub = require("./users/social/github-auth");
export { get, post, getSchema, sanitizeSql, datasquirelClient as client };
