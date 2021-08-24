import axios from 'axios'
import instance from "./interceptors";


export function getArticleList(query: any, page: any, props: any) {
    instance
        .post('http://localhost:8181/articles',
            JSON.stringify({
                tag: 2,
                category: 2
            }),
            {timeout: 86400000, headers: {
                    'Content-type': "application/json",
                    "dataType": "json",
                }}).then((res: any) => {
        if (res.status === 200 && res.data.code === 0) {
            props.listSuccess(res)
        } else {
            props.listFailure(res)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
};

export function save(article: any, props: any) {
    instance
        .post('http://localhost:8181/saveArticle',
            JSON.stringify({
                id: 1,
                content: article.content
            }),
            {timeout: 86400000, headers: {
                    'Content-type': "application/json",
                    "dataType": "json",
                }}).then((res: any) => {
        if (res.status === 200 && res.data.code === 0) {
            props.saveSuccess(res)
        } else {
            props.saveFailure(res)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
}

export function find(id: number, props: any) {
    instance
        .get(`http://localhost:8181/article/${id}`,
            {timeout: 86400000, headers: {
                    "dataType": "json",
                }}).then((res: any) => {
        if (res.status === 200 && res.data) {
            props.findSuccess(res)
        } else {
            props.findFailure(res)
        }
    })
        .catch((err: any) => {
            console.log(err)
        })
}
