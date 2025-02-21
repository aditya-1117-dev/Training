export default async function getRequest(api : string, headers? : { [key: string]: string }) {
    try {
        const res =  await fetch(api, {
            method: 'GET',
            headers: headers
        })
            .then(res => res.json())
        return res;
    }catch (e){
        return e;
    }
}