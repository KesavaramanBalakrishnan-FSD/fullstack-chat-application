export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";

export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`;

export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;

export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;

export const UPDATE_PROFILE_ROUTES = `${AUTH_ROUTES}/update-profile`;

export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;

export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;

export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

//Contacts APIs

export const CONTACTS_ROUTES = "/api/contacts";

export const SEARCH_CONTACTS = `${CONTACTS_ROUTES}/search`;

export const GET_DM_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/get-contacts-for-dm`;

export const GET_ALL_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/get-all-contacts`;

//Message APIs

export const MESSAGES_ROUTES = "/api/messages";

export const GET_ALL_MESSAGES_ROUTES = `${MESSAGES_ROUTES}/get-messages`;

export const UPLOAD_FILE_ROUTES = `${MESSAGES_ROUTES}/upload-file`;

//Channel APIs

export const CHANNEL_ROUTES = "/api/channel";

export const CREATE_CHANNEL_ROUTES = `${CHANNEL_ROUTES}/create-channel`;

export const GET_USER_CHANNELS_ROUTES = `${CHANNEL_ROUTES}/get-user-channels`;

export const GET_CHANNEL_MESSAGES = `${CHANNEL_ROUTES}/get-channel-messages`;
