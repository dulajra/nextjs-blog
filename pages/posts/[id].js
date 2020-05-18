import Head from 'next/head'

import {getAllPostIds, getPostById} from "../../lib/posts";
import Layout from "../../components/layout";
import Date from "../../components/date";
import styles from "../../styles/utils.module.css"

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={styles.headingXl}>{postData.title}</h1>
                <br/>
                {postData.id}
                <br/>
                <div className={styles.lightText}>
                    <Date dateString={postData.date}/>
                </div>
                <br/>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </Layout>
    )
}

export function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const postData = await getPostById(params.id);
    return {
        props: {
            postData
        }
    }
}