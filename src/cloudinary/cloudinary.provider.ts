import { v2, ConfigOptions } from 'cloudinary';
import config from '../config/configuration';

export const CloudinaryProvider = {
    provide: config().CLOUDINARY,
    useFactory: (): ConfigOptions => {
        return v2.config({
            cloud_name: 'dqaps630f',
            api_key: '371296742455875',
            api_secret: 'TrrrdaxtWVuJMKusxewNWJmYjts',
        });
    },
};