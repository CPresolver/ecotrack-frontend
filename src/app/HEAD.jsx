import Head from 'next/head'
import React from 'react'

const HeadComponent = ({ title }) => {
  return (
    <Head>
      <title>{ title }</title>
    </Head>
  )
}

export default HeadComponent