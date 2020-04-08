import auth from '../../services/auth';
/*
export function someAction (context) {
}
*/

export async function getCookie() {
    return await auth.getCookie()
        .then(res => {
            console.log('getCookie(Store): ', res);
        })
}