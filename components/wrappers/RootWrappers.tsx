'use client'
import createApolloClient from '@/utils/createApolloClient'
import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import FeedbackWrapper from './FeedbackWrapper'

interface Props {
    children: React.ReactNode
}

const RootWrappers = ({ children }: Props) => {
    return (
        <ThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>

            <ApolloProvider client={createApolloClient()}>
                {children}
            </ApolloProvider>
            <FeedbackWrapper />
        </ThemeProvider>
    )
}

export default RootWrappers
