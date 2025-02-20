export default async function postRequest(api : string, payload? : {}) {
    try {
        const res =  await fetch(api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then(res => res.json())
        return res;
    }catch (e){
        return e;
    }
}