export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",//Signup
        LOGIN: "/api/auth/login",//Authenticate user & return JWT token
        GET_PROFILE: "/api/auth/profile",//Get logged-in user details
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", //Upload user profile image
    },

    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions",//Generate interview questions
        GENERATE_EXPLANATION: "/api/ai/generate-explanation",//Generate concept explanations
    },
    SESSION: {
        CREATE: "/api/sessions/create",//Create new session
        GET_ALL: "/api/sessions/my-sessions",//Get all user sessions
        GET_ONE: (id) => `/api/sessions/${id}`,//Get session details with questions
        DELETE: (id) => `/api/sessions/${id}`,//Delete session
    },

    QUESTION: {
        ADD_TO_SESSION: "/api/questions/add",//Add additional questions to existing session
        PIN: (id) => `/api/questions/${id}/pin`,//Pin or unpin a question
        UPDATE_NOTE: (id) => `/api/questions/${id}/note`,//Add note to a question
    },
}