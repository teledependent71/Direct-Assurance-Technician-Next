import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Direct Assurance Technician</title>
          <meta
            property="og:title"
            content="test-page - Direct Assurance Technician"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_ogd9t) => (
            <>
              <h1>{context_ogd9t?.Name}</h1>
            </>
          )}
          initialData={props.contextOgd9tProp}
          persistDataDuringLoading={true}
          key={props?.contextOgd9tProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextOgd9tProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextOgd9tProp: contextOgd9tProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
