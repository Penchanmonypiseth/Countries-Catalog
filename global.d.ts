import { Request } from './src/shared/services/Request';
// Extend ComponentCustomProperties to include the global properties
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $RequestService: Request;
    }
}
