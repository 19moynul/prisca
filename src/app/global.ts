import { environment } from '../environments/environment';
export const GlobalVariable = Object.freeze({
  BASE_URL: environment,
  BASE_API_URL: environment.apiUrl,
  FRONTEND_API_URL: environment.frontendUrl,
  IMAGE_PATH: environment.imagePath
});
