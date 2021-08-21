import axios from 'axios'
import instance from "./interceptors";


export function getArticleList(query: any, page: any, props: any) {
    instance
        .post('http://localhost:8183/api/addFiles',
            JSON.stringify(query),
            {timeout: 86400000, headers: {
                    'Content-type': "application/x-www-form-urlencoded",
                    "dataType": "json",
                }}).then((res: any) => {
        if (res.status === 200 && res.data.code === 0) {
            props.listSuccess(res.data)
        } else {
            props.listFailure(res.data.message)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
};
