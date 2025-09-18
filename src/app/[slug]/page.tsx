const Page = async ({searchParams} : {searchParams : Promise<{query?: string}>}) => {
    return (
            <>
                <h2>Post Works {(await searchParams).query || 'No Query'}</h2>
            </>
        )
}

export default Page