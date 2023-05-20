import axios, { AxiosRequestConfig } from 'axios';
import minimist from 'minimist';

interface IConfig {
    username: string;
    password: string;
}

const main = async ({ username, password }: IConfig) => {
    // request 1
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://apijumboweb.smdigital.cl/user/api/v1/vtexid/pub/authentication/start',
        headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42',
            'x-api-key': 'IuimuMneIKJd3tapno2Ag1c1WcAES97j'
        },
    };
    const { data: { authenticationToken } } = await axios(config);
    // request 2
    config.method = 'POST';
    config.url = 'https://apijumboweb.smdigital.cl/user/api/v1/vtexid/pub/authentication/classic/validate';
    config.headers!['content-type'] = 'application/json',
    config.data = JSON.stringify({ authenticationToken, login: username, password });
    return (await axios(config)).data;
};

(async () => {
    // arguments
    const { _, username, password } = minimist(process.argv, {
        string: [ 'username', 'password' ],
        default: {
            username: 'giloga5097@carpetra.com',
            password: '12345678xD',
        }
    });
    console.log('Logging in with...', { username, password });
    main({ username, password })
    .then(console.log)
    .catch(console.log);
})();