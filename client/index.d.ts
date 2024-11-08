export namespace media {
    export { imageInputToBase64 };
    export { imageInputFileToBase64 };
    export { inputFileToBase64 };
}
export namespace auth {
    export namespace google {
        export { getAccessToken };
    }
    export namespace github {
        export { getGithubAccessToken as getAccessToken };
    }
    export { logout };
}
export namespace fetch {
    export { fetchApi };
    export { clientFetch };
}
import imageInputToBase64 = require("./media/imageInputToBase64");
import imageInputFileToBase64 = require("./media/imageInputFileToBase64");
import inputFileToBase64 = require("./media/inputFileToBase64");
import getAccessToken = require("./auth/google/getAccessToken");
import getGithubAccessToken = require("./auth/github/getAccessToken");
import logout = require("./auth/logout");
import { fetchApi } from "./fetch";
import clientFetch = require("./fetch");
