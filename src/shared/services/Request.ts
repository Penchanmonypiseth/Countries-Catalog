export class Request {
    public async get(endPoint: string): Promise<any> {
        try {
            const response = await fetch(endPoint);
            if (!response.ok) {
                throw new Error(`HTTP Error Status${response.status}`);
            }
            const data = response.json();
            return data;
        } catch (error) {
            throw new Error(`Fail to fetch ${error}`);
        }
    }
};